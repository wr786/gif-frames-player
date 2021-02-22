import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import { render } from '@testing-library/react';
import { Image, Button, Space } from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Typography } from 'antd';
import { Tooltip } from 'antd';
import { LeftOutlined, RightOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';

const { Header, Content, Footer } = Layout;
const { Title, Link } = Typography;

class ImageBox extends React.Component {
  render() { 
    return (
    <Image
      width={260}
      src={this.props.src}
    />
  );}
}

class RecButton extends React.Component {
  render() {
    return (
      <Tooltip title={this.props.title}>
        <Button className="my-button" type="primary" shape="circle" icon={this.props.icon} style={this.props.style} />
      </Tooltip>
    )
  }
}

class ButtonList extends React.Component {
  render() {
    return (
      <div className="icons-list">
        <RecButton 
          title="Prev Frame" 
          icon={<LeftOutlined />}
        />
        <RecButton 
          title="Play" 
          icon={<CaretRightOutlined />}
        />
        <RecButton 
          title="Next Frame" 
          icon={<RightOutlined />}
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
    };
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

  render() {
    const src = this.calculateSRC();
    // console.log(src);
    return (
        <Layout className="layout">
        <Header style={{ textAlign: 'center', padding: '0.5em' }}>
          <Title><div className="white-text">GIF Frames Player</div></Title>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <Row type="flex" justify="center" align="middle">
              <Col>
                <ImageBox src={src}/> 
              </Col>
            </Row>
            <Row type="flex" justify="center" align="middle">
              <Col>
                <ButtonList />
              </Col>
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>GIF Frames Player by <Link href="https://github.com/wr786" target="_blank">wr786</Link> </Footer>
      </Layout>
    )
  }
}

ReactDOM.render(<MainPage />, document.getElementById("root"));