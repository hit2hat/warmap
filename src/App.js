import React from 'react';
import About from './components/about';

const Card = (props) => {
    return (
        <div style={{
            height: 125,
            width: 200,
            marginLeft: 25,
            marginRight: 25,
            borderRadius: 8,
            background: 'white'}}
        onClick={
            () => {
                window.cameraControls.rotateTo(3, 1, true);
                window.cameraControls.dollyTo(300, true);
                props.closeBtn.current.style.opacity = 1;
                window.cameraControls.enabled = false;
            }
        }>

        </div>
    );
};

const CardWrapper = (props) => {
    return (
        <div style={{
            position: 'absolute',
            bottom: 0,
            marginBottom: 25,
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

    closeBtn = React.createRef();

    onCloseBtn = () => {
        this.closeBtn.current.style.opacity = 0;
        window.cameraControls.dollyTo(500, true);
        window.cameraControls.enabled = true;
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
                        marginRight: 50,
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
                <CardWrapper>
                    <Card closeBtn={this.closeBtn} />
                    <Card closeBtn={this.closeBtn} />
                    <Card closeBtn={this.closeBtn} />
                    <Card closeBtn={this.closeBtn} />
                    <Card closeBtn={this.closeBtn} />
                </CardWrapper>
            </div>
        );
    }
}

export default App;