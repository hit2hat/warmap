import React from 'react';
import About from './components/about';
import Panel from './components/panel';


const Card = (props) => {
    return (
        <div
            style={{
                height: props.general ? 150 : 125,
                width: props.general ? 350 : 200,
                marginBottom: props.general ? 25: 0,
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
                src={props.img}
                width={props.general ? 32 : 20}
                height={props.general ? 32 : 20}
            />
            {
                props.general ?
                    <h2 style={{marginTop: 5}}>{props.title}</h2>
                    :
                    <h3 style={{marginTop: 5, fontWeight: 300}}>{props.title}</h3>
            }

        </div>
    );
};

const CardWrapper = (props) => {
    return (
        <div style={{
            position: 'absolute',
            bottom: 0,
            marginBottom: 0,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
        }}
            onClick={() => props.illCode()}
        >
            {props.children}
        </div>
    );
};


class App extends React.Component {

    state = {
        points: [],
        actual_point: {},
        illCode: false
    };

    closeBtn = React.createRef();

    onCloseBtn = () => {
        if (!Object.keys(this.state.actual_point).length) return;
        if (this.state.illCode) return this.setState({ illCode: false});
        window.cameraControls.dollyTo(500, true);
        window.cameraControls.enabled = true;
        this.setState({actual_point: {}, illCode: false});
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
        window.react['close_panel'] = this.onCloseBtn.bind(this);

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
                        background: 'rgba(0, 0, 0, 0)',
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
                        color: 'rgba(0, 0, 0, 0)',
                        opacity: 0
                    }}
                    onClick={this.onCloseBtn}
                >
                    X
                </div>
                <About/>
                <Panel
                    illCode={() => this.setState({ illCode: true })}
                    point={this.state.actual_point}
                />
                <CardWrapper
                    illCode={() => this.setState({ illCode: true })}
                >
                    <Card
                        id={1}
                        title="Поиск"
                        img="/assets/search.svg"
                        showInfo={() => null}
                    />
                    <Card
                        general
                        id={1}
                        title="Выходцы из Рыбинска"
                        img="/assets/war.svg"
                        showInfo={() => null}
                    />
                    <Card
                        id={1}
                        title="О стенде"
                        img="/assets/about.svg"
                        showInfo={() => null}
                    />
                </CardWrapper>

            </div>
        );
    }
}

export default App;