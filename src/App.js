import React from 'react';
import About from './components/about';
import Panel from './components/panel';


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
            </div>
        );
    }
}

export default App;