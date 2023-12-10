import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import Login from "../components/auth/login/login.component";
import Auth from "../routes/auth.route";
import WhiteboardViewer from "../routes/whiteboard-viewer.route";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Login">
                <Login/>
            </ComponentPreview>
            <ComponentPreview path="/Auth">
                <Auth/>
            </ComponentPreview>
            <ComponentPreview path="/WhiteboardViewer">
                <WhiteboardViewer/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews