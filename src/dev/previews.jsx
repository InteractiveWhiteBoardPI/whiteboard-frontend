import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import UserSelector from "../components/chat/user-selector/user-selector.component";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/UserSelector">
                <UserSelector/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews