import React from 'react';
import Label from './label';
import EventCard from './event-card';

import '../styles/panel.css';

class InfoPanel extends React.Component {
    render() {
        if (!this.props.point.id) return (<div/>);
        return (
            <div>
                <div className="panel" style={{left: 0, marginLeft: 20}}>
                    <div className="content">
                        <div style={{display: 'flex'}}>
                            <div style={{width: '50%'}}>
                                <img
                                    src={"/assets/packs/" + this.props.point.id + "/images/cover.jpg"}
                                    width="100%"
                                    alt=""
                                />
                            </div>
                            <div style={{display: 'flex', width: '50%', flexDirection: 'column'}}>
                                <div style={{display: 'flex'}}>
                                    <div style={{margin: 0, padding: 0, display: 'flex', width: '50%'}}>
                                        <img
                                            src={"/assets/packs/" + this.props.point.id + "/images/0.jpg"}
                                            width="100%"
                                            height="100%"
                                            alt=""
                                        />
                                    </div>
                                    <div style={{margin: 0, padding: 0, display: 'flex', width: '50%'}}>
                                        <img
                                            src={"/assets/packs/" + this.props.point.id + "/images/1.jpg"}
                                            width="100%"
                                            height="100%"
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <div style={{margin: 0, padding: 0, display: 'flex', width: '50%'}}>
                                        <img
                                            src={"/assets/packs/" + this.props.point.id + "/images/2.jpg"}
                                            width="100%"
                                            height="100%"
                                            alt=""
                                        />
                                    </div>
                                    <div style={{margin: 0, padding: 0, display: 'flex', width: '50%'}}>
                                        <img
                                            src={"/assets/packs/" + this.props.point.id + "/images/3.jpg"}
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
                            <h3>Потери</h3>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    background: 'rgba(255, 0, 0, 0.8)',
                                    color: 'white',
                                    paddingTop: 15,
                                    paddingBottom: 15
                                }}
                            >
                                {this.props.point.losses} человек
                            </div>
                            <h3>События</h3>
                            {this.props.point.events.map((event, index) => {
                                return (
                                    <EventCard
                                        key={index}
                                        event={event}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InfoPanel;