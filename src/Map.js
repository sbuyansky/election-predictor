
import React, { Component } from "react"
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
} from "react-simple-maps"

const wrapperStyles = {
    width: "100%",
    maxWidth: 980,
    margin: "0 auto",
}

function Map(props) {
    return (
        <div style={wrapperStyles}>
            <ComposableMap
                projection="albersUsa"
                projectionConfig={{
                    scale: 1000,
                }}
                width={980}
                height={551}
                style={{
                    width: "100%",
                    height: "auto",
                }}
            >
                <ZoomableGroup center={[0, 20]} disablePanning>
                    <Geographies geography={props.geography}>
                        {(geographies, projection) => geographies.map((geography, i) => (
                            <Geography
                                key={i}
                                geography={geography}
                                projection={projection}
                                style={{
                                    default: {
                                        fill: props.elections[geography.properties.NAME] != null ? "#ECEFF1" : "#000000",
                                        stroke: props.elections[geography.properties.NAME] != null ? "#607D8B" : "#FF",
                                        strokeWidth: 0.75,
                                        outline: "none",
                                    },
                                    hover: {
                                        fill: "#607D8B",
                                        stroke: "#607D8B",
                                        strokeWidth: 0.75,
                                        outline: "none",
                                    },
                                    pressed: {
                                        fill: "#FF5722",
                                        stroke: "#607D8B",
                                        strokeWidth: 0.75,
                                        outline: "none",
                                    },
                                }}
                            />
                        ))}
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
        </div>
    )
}

export default Map