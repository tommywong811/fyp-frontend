import PropTypes from 'prop-types';
import classnames from 'classnames';
import React, { Component, createRef } from 'react';
import get from 'lodash.get';
import pick from 'lodash.pick';
import isNil from 'lodash.isnil';
import { connect } from 'react-redux';
import throttle from 'lodash.throttle';
import CanvasHandler from './CanvasHandler';
import { APIEndpoint } from '../../config/config';
import style from './MapCanvas.module.css';
import { propTypes as urlPropTypes } from '../Router/Url';
import getConnectedComponent from '../ConnectedComponent/getConnectedComponent';
import { getMapItemsAction } from '../../reducers/mapItems';
import { PLATFORM } from '../Main/detectPlatform';

class MapCanvas extends Component {
  canvasRootRef = createRef();

  canvasHandler = new CanvasHandler();

  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.object),
    ...urlPropTypes,
    getMapItemsHandler: PropTypes.func.isRequired,
    floorStore: PropTypes.shape({}).isRequired,
    appSettingsStore: PropTypes.shape({}).isRequired,
    linkTo: PropTypes.func.isRequired,
    platform: PropTypes.oneOf(Object.values(PLATFORM)),
  };

  state = {
    width: null,
    height: null,
    scaledWidth: null,
    scaledHeight: null,
    movingX: null,
    movingY: null,
    movingScaledX: null,
    movingScaledY: null,
    movingLeftX: null,
    movingTopY: null,
    movingScreenLeftX: null,
    movingScreenTopY: null,
    nextLevel: null,
    previousLevel: null,
  };

  componentDidMount() {
    const { linkTo, getMapItemsHandler, appSettingsStore } = this.props;

    window.canvasHandler = this.canvasHandler;

    this.canvasHandler.addMouseUpListener(({ x, y, floor, level }) => {
      // update position param if changed due to mouse event
      const isPositionReady = [x, y, level, floor].every(v => !isNil(v));
      if (isPositionReady) {
        linkTo({ floor, x, y, level });
      }
    });

    this.canvasHandler.addWheelListener(({ wheelDelta, x, y, floor, nextLevel, previousLevel }) => {
      if (wheelDelta > 0) {
        linkTo({ floor, x, y, level: nextLevel });
      } else {
        linkTo({ floor, x, y, level: previousLevel });
      }
    });

    const { x, y, floor, level } = this.props;

    this.canvasRootRef.current.appendChild(this.canvasHandler.getCanvas());
    this.canvasHandler.updateDimension(
      this.canvasRootRef.current.offsetWidth,
      this.canvasRootRef.current.offsetHeight,
      appSettingsStore.levelToScale,
    );

    this.setState({
      width: this.canvasRootRef.current.offsetWidth,
      height: this.canvasRootRef.current.offsetHeight,
    });

    this.canvasHandler.addPositionChangeListener(
      throttle(
        ({ floor: _floor, leftX, topY, scaledWidth: _width, scaledHeight: _height }) => {
          const isPositionReady =
            [leftX, topY, _width, _height].every(v => !isNaN(v)) && !isNil(_floor);

          if (isPositionReady) {
            getMapItemsHandler(_floor, [leftX, topY], _width, _height);
          }
        },
        1000,
        { leading: false },
      ),
    );

    this.canvasHandler.addPositionChangeListener(
      ({
        width,
        height,
        scaledWidth,
        scaledHeight,
        x: movingX,
        y: movingY,
        scaledX: movingScaledX,
        scaledY: movingScaledY,
        leftX: movingLeftX,
        topY: movingTopY,
        screenLeftX: movingScreenLeftX,
        screenTopY: movingScreenTopY,
        nextLevel,
        previousLevel,
      }) => {
        this.setState({
          width,
          height,
          scaledWidth,
          scaledHeight,
          movingX,
          movingY,
          movingScaledX,
          movingScaledY,
          movingLeftX,
          movingTopY,
          movingScreenLeftX,
          movingScreenTopY,
          nextLevel,
          previousLevel,
        });
      },
    );

    // init position param
    linkTo({ floor, x, y, level });
    this.canvasHandler.updatePosition(x, y, floor, level);
  }

  componentDidUpdate(prevProps) {
    // sync react position to canvas if it is changed
    const { x, y, floor, level } = this.props;
    if (
      x !== prevProps.x ||
      y !== prevProps.y ||
      floor !== prevProps.floor ||
      level !== prevProps.level
    ) {
      this.canvasHandler.updatePosition(x, y, floor, level);
    }
  }

  render() {
    const {
      children,
      place,
      fromPlace,
      toPlace,
      mapItemType,
      x,
      y,
      floor,
      level,
      linkTo,
      floorStore: { floors, buildings },
      platform,
    } = this.props;

    const { width, height } = this.state;

    const urlParams = {
      place,
      fromPlace,
      toPlace,
      mapItemType,
      x,
      y,
      level,
      floor,
    };

    const isDimensionReady = width && height;

    const isMobile = platform === PLATFORM.MOBILE;

    return (
      <div className={style.body}>
        {!isMobile ? (
          <div className={style.title}>
            <div className={style.floor}>
              {get(floors, `${floor}.name`) &&
                `Floor ${floors[floor].name} - ${buildings[floors[floor].buildingId].name}`}
            </div>
            <div className={style.buttons}>
              <a className={style.button} href="/suggestions.html">
                Suggestion
              </a>
              <button className={style.button} type="button">
                Print
              </button>
            </div>
          </div>
        ) : null}
        <div
          className={classnames(style.canvasRoot, { [style['canvasRoot--mobile']]: isMobile })}
          ref={this.canvasRootRef}
        >
          {isDimensionReady &&
            children.map(({ id, MapCanvasPlugin }) => {
              if (!MapCanvasPlugin) {
                return null;
              }

              if (MapCanvasPlugin.platform && !MapCanvasPlugin.platform.includes(platform)) {
                return null;
              }

              const PluginComponent = getConnectedComponent(
                `mapCanvas_${id}`,
                MapCanvasPlugin.connect,
                MapCanvasPlugin.Component,
              );

              return (
                <PluginComponent
                  key={id}
                  {...pick(
                    {
                      ...urlParams,
                      ...this.state,
                      ...this.canvasHandler.getProps(),
                      platform,
                      linkTo,
                      APIEndpoint,
                    },
                    MapCanvasPlugin.connect,
                  )}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    appSettingsStore: state.appSettings,
    floorStore: state.floors,
  }),
  dispatch => ({
    getMapItemsHandler: (floor, [startX, startY], width, height) => {
      dispatch(getMapItemsAction(floor, [startX, startY], width, height));
    },
  }),
)(MapCanvas);
