import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import isMobile from 'ismobilejs';
import { render } from '@testing-library/react';
import { Image, Button, Space } from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Typography } from 'antd';
import { Tooltip } from 'antd';
import { LeftOutlined, RightOutlined, CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import { Badge, Switch } from 'antd';
import { InputNumber } from 'antd';

const { Header, Content, Footer } = Layout;
const { Title, Link } = Typography;

// 针对移动端优化
const DEVICE = isMobile(window.navigator);
const ISMOBILE = DEVICE.any;

class ImageBox extends React.Component {
  render() { 
    return (
    <Image
      width={ISMOBILE? 240: 400}
      src={this.props.src}
    />
  );}
}

class RecButton extends React.Component {
  render() {
    return (
      <Tooltip title={this.props.title}>
        <Button 
          className = "my-button" 
          type = "primary" 
          shape = "circle" 
          size = "large"
          icon = {this.props.icon} 
          style = {this.props.style} 
          onClick = {() => this.props.onClick()}
        />
      </Tooltip>
    )
  }
}

class DigitInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      curNum: 1,
    };
  }

  on_change = (i) => {
    const state = this.state;
    state.curNum = i;
    this.setState(state);
  }

  render() {
    return (
      <>
        <InputNumber 
          min = {1} 
          max = {this.props.imageTotNum} 
          defaultValue = {1}
          onChange = {this.on_change}
        />
        <Button 
         type = "primary"
         onClick = {() => this.props.onClick(this.state.curNum)}
        >
          Jump!
        </Button>
      </>
    )
  }
}

class ButtonList extends React.Component {
  render() {
    let playIcon = <CaretRightOutlined />;
    let playTitle = "Play";
    if(this.props.isPlaying) {
      playIcon = <PauseOutlined />
      playTitle = "Pause";
    }
    return (
      <div className="icons-list">
        <RecButton 
          title = "Prev Frame" 
          icon = {<LeftOutlined />}
          onClick = {() => this.props.prev_frame()}
        />
        <RecButton 
          title = {playTitle} 
          icon = {playIcon}
          onClick = {() => this.props.play()}
        />
        <RecButton 
          title = "Next Frame" 
          icon = {<RightOutlined />}
          onClick = {() => this.props.next_frame()}
        />
      </div>
    )
  }
}

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folderRelPath: "/assets/images/",
      imagePrefix: "XVmZGe0",
      imageSuffix: ".png",
      imageTotNum: 131,
      imageCurIdx: 1,
      splitChar: '-',
      isPlaying: false,
    };
    setInterval(this.update_play, 100);
  }

  prev_frame = () => {
    const state = this.state;
    let imageCurIdx = state.imageCurIdx;
    let imageTotNum = state.imageTotNum;
    imageCurIdx = (imageCurIdx - 2 + imageTotNum) % imageTotNum + 1;
    state.imageCurIdx = imageCurIdx;
    this.setState(state);
  }

  next_frame = () => {
    const state = this.state;
    let imageCurIdx = state.imageCurIdx;
    let imageTotNum = state.imageTotNum;
    imageCurIdx = (imageCurIdx) % imageTotNum + 1;
    state.imageCurIdx = imageCurIdx;
    this.setState(state);
  }

  play = () => {
    const state = this.state;
    state.isPlaying = !state.isPlaying;
    this.setState(state);
  }

  update_play = () => {
    const isPlaying = this.state.isPlaying;
    if(isPlaying) {
      this.next_frame();
    }
  }

  calculateSRC = () => {
    const folderRelPath = this.state.folderRelPath;
    const imagePrefix = this.state.imagePrefix;
    const imageSuffix = this.state.imageSuffix;
    const imageCurIdx = this.state.imageCurIdx;
    const splitChar = this.state.splitChar;
    let src = folderRelPath + imagePrefix + splitChar  + imageCurIdx.toString() + imageSuffix;
    return src; 
  };

  jumpto = (i) => {
    // stop the playing to prevent bugs
    if (this.state.isPlaying) {
      this.play();
    }
    const state = this.state;
    state.imageCurIdx = i;
    this.setState(state);
  }

  render() {
    const src = this.calculateSRC();
    
    return (
        <Layout className="layout">
        <Header style={{ textAlign: 'center', padding: '0.5em' }}>
          <Title><div className="white-text">GIF Frames Player</div></Title>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <Row type="flex" justify="center" align="middle">
              <Col>
                <Badge count={this.state.imageCurIdx} overflowCount={999}>
                  <ImageBox src={src}/> 
                </Badge>
              </Col>
            </Row>
            <Row type="flex" justify="center" align="middle">
              <Col>
                <ButtonList 
                  prev_frame = {this.prev_frame}
                  play = {this.play}
                  next_frame = {this.next_frame}
                  isPlaying = {this.state.isPlaying}
                />
              </Col>
            </Row>
            <Row type="flex" justify="center" align="middle">
              <DigitInput 
                max = {this.state.imageTotNum}
                onClick = {this.jumpto}
              />
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>GIF Frames Player by <Link href="https://github.com/wr786" target="_blank">wr786</Link> </Footer>
      </Layout>
    )
  }
}

ReactDOM.render(<MainPage />, document.getElementById("root"));