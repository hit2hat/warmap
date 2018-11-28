import React from 'react';
import Label from './label';

import 'viewerjs/dist/viewer.css';
import '../styles/panel.css';

import Viewer from 'viewerjs';
import ReactDOM from 'react-dom';


class InfoPanel extends React.Component {

    connectViewer(node) {
        if (node) {
            new Viewer(ReactDOM.findDOMNode(node), {
                toolbar: false,
                navbar: false,
                title: false,
                movable: false,
                button: false
            });
        }
    }

    render() {
        if (!this.props.point.id) return (<div/>);
        return (
            <div>
                <div className="panel" style={{left: 0, marginLeft: 20}}>
                    <div className="content">
                        <div ref={(node) => this.connectViewer(node)} style={{display: 'flex'}}>
                            <div style={{width: '50%'}}>
                                <img
                                    src={"assets/packs/" + this.props.point.id + "/cover.jpg"}
                                    width="100%"
                                    alt=""
                                />
                            </div>
                            <div style={{display: 'flex', width: '50%', flexDirection: 'column'}}>
                                <div style={{display: 'flex'}}>
                                    <div style={{margin: 0, padding: 0, display: 'flex', width: '50%'}}>
                                        <img
                                            src={"assets/packs/" + this.props.point.id + "/0.jpg"}
                                            width="100%"
                                            height="100%"
                                            alt=""
                                        />
                                    </div>
                                    <div style={{margin: 0, padding: 0, display: 'flex', width: '50%'}}>
                                        <img
                                            src={"assets/packs/" + this.props.point.id + "/1.jpg"}
                                            width="100%"
                                            height="100%"
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <div style={{margin: 0, padding: 0, display: 'flex', width: '50%'}}>
                                        <img
                                            src={"assets/packs/" + this.props.point.id + "/2.jpg"}
                                            width="100%"
                                            height="100%"
                                            alt=""
                                        />
                                    </div>
                                    <div style={{margin: 0, padding: 0, display: 'flex', width: '50%'}}>
                                        <img
                                            src={"assets/packs/" + this.props.point.id + "/3.jpg"}
                                            width="100%"
                                            height="100%"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <h1 style={{marginTop: 5}}>{this.props.point.title}</h1>
                        <div style={{marginTop: 5}}>
                            {this.props.point.tags.map((tag, index) => {
                                return (
                                    <Label
                                        key={index}
                                        text={tag}
                                    />
                                );
                            })}
                        </div>

                        <h4 style={{fontSize: 14}}>
                            {this.props.point.text}
                        </h4>
                    </div>
                </div>
                <div className="panel">
                    <div className="content">
                        <div style={{marginTop: 15}}>
                            <h3>Итоги</h3>
                            <div style={{color: 'rgba(0, 0, 0, 0.7)'}}>
                                {this.props.point.result}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InfoPanel;