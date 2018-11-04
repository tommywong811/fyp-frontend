import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchMapItemAction, searchMapItemPropTypes } from '../../reducers/searchMapItem';
import {
  searchShortestPathAction,
  clearSearchShortestPathResultAction,
} from '../../reducers/searchShortestPath';
import { searchNearestAction, clearSearchNearestResultAction } from '../../reducers/searchNearest';
import { setSearchOptionsAction, searchOptionsPropTypes } from '../../reducers/searchOptions';
import { floorsPropTypes } from '../../reducers/floors';
import { placePropTypes } from '../Router/Url';
import { TYPE as INPUT_TYPE, isEqual as InputIsEqual } from './Input';

class SearchArea extends Component {
  static propTypes = {
    searchMapItemHandler: PropTypes.func.isRequired,
    searchShortestPathHandler: PropTypes.func.isRequired,
    clearSearchShortestPathResultHandler: PropTypes.func.isRequired,
    searchNearestHandler: PropTypes.func.isRequired,
    clearSearchNearestResultHandler: PropTypes.func.isRequired,
    searchMapItemStore: searchMapItemPropTypes.isRequired,
    floorStore: floorsPropTypes.isRequired,
    SearchView: PropTypes.func.isRequired,
    linkTo: PropTypes.func.isRequired,
    setSearchOptionsHandler: PropTypes.func.isRequired,
    searchOptionsStore: searchOptionsPropTypes.isRequired,
    displayAdvancedSearch: PropTypes.bool,
    from: placePropTypes,
    to: placePropTypes,
    search: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    // init orders, do not need to react if props changed later
    this.state = {
      searchInputOrders:
        this.props.from.data.type === INPUT_TYPE.NEAREST
          ? ['SearchNearest', 'SearchInput']
          : ['SearchInput', 'SearchNearest'],
    };
  }

  componentDidMount() {
    if (this.props.search) {
      this.search();
    }
    console.log('searchArea mount', this.props.to);
  }

  componentDidUpdate(prevProps) {
    console.log('searchArea did update', this.props.search, prevProps.search);
    if (
      this.props.search &&
      (!InputIsEqual(prevProps.to, this.props.to) ||
        !InputIsEqual(prevProps.from, this.props.from) ||
        this.props.search !== prevProps.search ||
        this.props.searchOptionsStore !== prevProps.searchOptionsStore)
    ) {
      this.search();
    }
  }

  onKeywordChange = direction => keyword => {
    const { searchMapItemHandler, linkTo } = this.props;

    if (!keyword.length) {
      linkTo({ [direction]: { name: '', data: {} }, search: false });
      return;
    }
    linkTo(
      {
        [direction]: { name: keyword, data: { type: INPUT_TYPE.KEYWORD, value: keyword } },
        search: false,
      },
      'replace',
    );
    searchMapItemHandler(keyword);
  };

  onAutoCompleteItemClick = direction => ({
    name,
    coordinates: [x, y],
    floor,
    id,
    displayName,
  }) => {
    this.props.linkTo({
      search: false,
      floor,
      x,
      y,
      [direction]: {
        name: displayName || name,
        data: { id, floor, value: name, type: INPUT_TYPE.ID, coordinates: [x, y] },
      },
    });
  };

  onNearestItemClick = direction => ({ name, data }) => {
    this.props.linkTo({
      [direction]: { name, data },
      search: false,
    });
  };

  updateSameFloor = e => {
    this.updateSearchOptions({
      sameFloor: e.target.checked,
    });
  };

  updateSearchOptions = newSearchOptions => {
    this.props.setSearchOptionsHandler({
      ...newSearchOptions,
    });
  };

  switchInputOrder = () => {
    const { from, to, linkTo } = this.props;

    this.setState(prevState => ({
      searchInputOrders: [...prevState.searchInputOrders].reverse(),
    }));

    linkTo({
      from: to,
      to: from,
      search: false,
    });
  };

  linkToSearch = () => {
    this.props.linkTo({ search: true });
  };

  search = () => {
    const {
      searchShortestPathHandler,
      clearSearchShortestPathResultHandler,
      searchNearestHandler,
      clearSearchNearestResultHandler,
      searchOptionsStore: { sameFloor },
      from: {
        data: { type: fromType, id: fromId, floor: fromFloor, value: fromValue },
      },
      to: {
        data: { type: toType, id: toId, floor: toFloor, value: toValue },
      },
    } = this.props;

    if ((!fromValue && !fromId) || (!toValue && !toId)) {
      return;
    }

    clearSearchNearestResultHandler();
    clearSearchShortestPathResultHandler();

    if (fromType === INPUT_TYPE.NEAREST) {
      searchNearestHandler(toFloor, toValue, fromValue, sameFloor, toId);
    } else if (toType === INPUT_TYPE.NEAREST) {
      searchNearestHandler(fromFloor, fromValue, toValue, sameFloor, fromId);
    } else {
      // point to point search
      const searchFrom =
        fromType === INPUT_TYPE.KEYWORD ? { keyword: fromValue } : { id: fromId, floor: fromFloor };
      const searchTo =
        toType === INPUT_TYPE.KEYWORD ? { keyword: toValue } : { id: toId, floor: toFloor };

      searchShortestPathHandler(searchFrom, searchTo);
    }
  };

  render() {
    const {
      floorStore,
      searchMapItemStore,
      searchOptionsStore,
      displayAdvancedSearch,
      SearchView,
      from,
      to,
    } = this.props;
    return (
      <SearchView
        floorStore={floorStore}
        searchMapItemStore={searchMapItemStore}
        searchOptionsStore={searchOptionsStore}
        searchInputOrders={this.state.searchInputOrders}
        from={from}
        to={to}
        onKeywordChange={this.onKeywordChange}
        onAutoCompleteItemClick={this.onAutoCompleteItemClick}
        onNearestItemClick={this.onNearestItemClick}
        switchInputOrder={this.switchInputOrder}
        updateSameFloor={this.updateSameFloor}
        search={this.linkToSearch}
        displayAdvancedSearch={displayAdvancedSearch}
        updateSearchOptions={this.updateSearchOptions}
      />
    );
  }
}

export default connect(
  state => ({
    searchMapItemStore: state.searchMapItem,
    searchOptionsStore: state.searchOptions,
    floorStore: state.floors,
  }),
  dispatch => ({
    searchMapItemHandler: keyword => {
      dispatch(searchMapItemAction(keyword));
    },
    searchShortestPathHandler: (from, to) => {
      dispatch(searchShortestPathAction(from, to));
    },
    clearSearchShortestPathResultHandler: () => {
      dispatch(clearSearchShortestPathResultAction());
    },
    searchNearestHandler: (floor, name, nearestType, sameFloor, id) => {
      dispatch(searchNearestAction(floor, name, nearestType, sameFloor, id));
    },
    clearSearchNearestResultHandler: () => {
      dispatch(clearSearchNearestResultAction());
    },
    setSearchOptionsHandler: payload => {
      dispatch(setSearchOptionsAction(payload));
    },
  }),
)(SearchArea);
