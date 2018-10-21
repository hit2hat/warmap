import React from 'react';

import '../styles/event-card.css';

const EventCard = (props) => {
    return (
        <div className="event-card">
            <h4>
                <img
                    style={{marginRight: 10}}
                    src="https://image.flaticon.com/icons/svg/1191/1191131.svg"
                    width="12"
                    height="12"
                    alt="123"
                />
                {props.event.title}
            </h4>
        </div>
    );
};

export default EventCard;