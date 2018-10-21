import React from 'react';
import About from './components/about';
import Panel from './components/panel';

const Card = (props) => {
    return (
        <div
            style={{
                height: 125,
                width: 200,
                marginLeft: 25,
                marginRight: 25,
                borderRadius: 8,
                background: 'white',
                color: 'black',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column'
            }}
            onClick={() => props.showInfo(props.id)}
            onTouchStart={() => props.showInfo(props.id)}
        >
            <img
                style={{marginTop: 25}}
                alt="123"
                src="https://image.flaticon.com/icons/svg/1191/1191131.svg"
                width="32"
                height="32"
            />
            <h2 style={{marginTop: 5}}>{props.title}</h2>
        </div>
    );
};

const CardWrapper = (props) => {
    return (
        <div style={{
            position: 'absolute',
            bottom: 0,
            marginBottom: 15,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
        }}>
            {props.children}
        </div>
    );
};

class App extends React.Component {

    state = {
        points: [],
        actual_point: {}
    };

    closeBtn = React.createRef();

    onCloseBtn = () => {
        this.closeBtn.current.style.opacity = 0;
        window.cameraControls.dollyTo(500, true);
        window.cameraControls.enabled = true;
        this.setState({actual_point: {}});
    };

    show_info = (id) => {
        this.state.points.map((point) => {
            if (point.id === id) {
                window.helpers.rotateToPoint(point.lat, point.lon);
                this.closeBtn.current.style.opacity = 1;
                window.cameraControls.enabled = false;
                this.setState({actual_point: point});
            }
            return true;
        });
    };

    componentWillMount = () => {
        window.react = {};
        window.react['show_info'] = this.show_info.bind(this);

        fetch('points.json')
            .then((data) => data.json())
            .then((data) => {
                this.setState({points: data.points});
                data.points.map((point) => {
                    window.helpers.addPoint({
                        id: point.id,
                        lat: point.lat,
                        lon: point.lon
                    });
                    return true;
                });
            })
    };

    render() {
        return (
            <div>
                <div
                    ref={this.closeBtn}
                    style={{
                        background: 'white',
                        width: 45,
                        height: 45,
                        position: 'absolute',
                        right: 0,
                        marginRight: 25,
                        marginTop: 25,
                        borderRadius: 45,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'black',
                        opacity: 0
                    }}
                    onClick={this.onCloseBtn}
                >
                    X
                </div>
                <About/>
                <Panel point={this.state.actual_point}/>
                <CardWrapper>
                    {this.state.points.map((point) => {
                        return <Card
                            key={point.id}
                            id={point.id}
                            title={point.title}
                            lat={point.lat}
                            lon={point.lon}
                            showInfo={this.show_info.bind(this)}
                        />
                    })}
                </CardWrapper>
            </div>
        );
    }
}

export default App;