import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isNil from 'lodash.isnil';
import PrimaryPanel from '../PrimaryPanel/PrimaryPanel';
import TopPanel from '../TopPanel/TopPanel';
import plugins from '../../plugins';
import MapCanvas from '../MapCanvas/MapCanvas';
import { parseParams, build as buildUrl } from '../Router/Url';
import style from './Main.module.css';
import detectPlatform, { PLATFORM } from './detectPlatform';
import MobileOverlay from '../MobileOverlay/MobileOverlay';

class Main extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    appSettingStore: PropTypes.shape({
      success: PropTypes.bool.isRequired,
      defaultPosition: PropTypes.shape({
        floor: PropTypes.string.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        level: PropTypes.number.isRequired,
      }).isRequired,
    }),
  };

  static defaultProps = {
    match: { params: {} },
  };

  constructor(props) {
    super(props);
    this.initPosition();
  }

  componentDidMount() {
    this.initPosition();
  }

  componentDidUpdate() {
    this.initPosition();
  }

  get urlParams() {
    return parseParams(this.props.match.params);
  }

  linkTo = position => {
    const { level: currentLevel, x: currentX, y: currentY, floor: currentFloor } = this.urlParams;
    const { floor = currentFloor, x = currentX, y = currentY, level = currentLevel } = position;

    const isNewPosition =
      floor !== currentFloor || x !== currentX || y !== currentY || level !== currentLevel;

    if (isNewPosition) {
      this.props.history.push(buildUrl({ floor, x, y, level }));
    }
  };

  initPosition() {
    // init position from app settings if current position is not set
    if (
      [this.urlParams.level, this.urlParams.x, this.urlParams.y, this.urlParams.floor].some(v =>
        isNil(v),
      )
    ) {
      const {
        appSettingStore: { defaultPosition, mobileDefaultPosition },
      } = this.props;

      const { floor, x, y, level } =
        detectPlatform() === PLATFORM.MOBILE ? mobileDefaultPosition : defaultPosition;

      if ([floor, x, y, level].every(v => !isNil(v))) {
        this.linkTo({ floor, x, y, level });
      }
    }
  }

  render() {
    const isMobile = detectPlatform() === PLATFORM.MOBILE;

    return (
      <>
        {!isMobile ? <div className={style.header}>HKUST Path Advisor</div> : null}
        <div className={classnames(style.body, { [style['body--mobile']]: isMobile })}>
          {!isMobile ? (
            <PrimaryPanel {...this.urlParams} linkTo={this.linkTo}>
              {plugins.map(
                ({ id, PrimaryPanelPlugin, OverlayHeaderPlugin, OverlayContentPlugin }) => ({
                  id,
                  PrimaryPanelPlugin,
                  OverlayHeaderPlugin,
                  OverlayContentPlugin,
                }),
              )}
            </PrimaryPanel>
          ) : (
            <>
              <TopPanel {...this.urlParams} linkTo={this.linkTo} />
              <MobileOverlay>
                {plugins.map(({ id, MobileOverlayHeaderPlugin, MobileOverlayContentPlugin }) => ({
                  id,
                  MobileOverlayHeaderPlugin,
                  MobileOverlayContentPlugin,
                }))}
              </MobileOverlay>
            </>
          )}
          {this.props.appSettingStore.success && (
            <MapCanvas {...this.urlParams} linkTo={this.linkTo} platform={detectPlatform()}>
              {plugins.map(({ id, MapCanvasPlugin }) => ({
                id,
                MapCanvasPlugin,
              }))}
            </MapCanvas>
          )}
        </div>
      </>
    );
  }
}

export default connect(state => ({ appSettingStore: state.appSettings }))(Main);
