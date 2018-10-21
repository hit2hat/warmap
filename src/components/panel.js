import React from 'react';
import Label from './label';
import EventCard from './event-card';

import '../styles/panel.css';

class InfoPanel extends React.Component {
    render() {
        if (!this.props.point.id) return (<div/>);
        return (
            <div className="panel">
                <div className="content">
                    <h1>{this.props.point.title}</h1>
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
                    <h4>
                        Cюда можно впелить описание
                    </h4>
                    <div style={{marginTop: 15}}>
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
        );
    }
}

export default InfoPanel;