import React from "react"
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
                                onClick={() => props.handleStateSelect(geography.properties.NAME)}
                                style={
                                    props.elections[geography.properties.NAME] != null ? {
                                    default: {
                                        fill: "#ECEFF1",
                                        stroke: "#607D8B",
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
                                        stroke: props.elections[geography.properties.NAME] != null ? "#607D8B" : "#FF",
                                        strokeWidth: 0.75,
                                        outline: "none",
                                    },
                                } : 
                                    {
                                        default: {
                                            fill: "#000",
                                            stroke: "#000",
                                            strokeWidth: 0.75,
                                            outline: "none",
                                        }
                                    }
                                }
                            />
                        ))}
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
        </div>
    )
}

export default Map