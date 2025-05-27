import React from 'react'

const Competible = () => {
    return (
        <div className='copetible' style={{ width: "100%", clear: "both", display: "block" }}>
            <div className="container">
                <div className="inner-copetible" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", margin: "3rem" }}>
                    {/* <div className="firstcidsnsm" > */}
                    <div className="first-copetible" style={{ width: "50%", paddingLeft: "10px", paddingRight: "15px", display: "flex", justifyContent: "center", flexDirection: "column" }}>
                        <div className="title-copetible" style={{ color: "#333", fontSize: "20px", fontWeight: "500" }}>
                            <h2 style={{ color: "#333", fontSize: "45px" }}>We’re compatible.</h2>
                        </div>
                        <div className="decription-copetible" style={{ maxWidth: "400px", color: "#333", fontSize: "20px" }}>
                            <p>Stream Plex from just about any phone, tablet, smart TV, gaming consoles, or PC.</p>
                        </div>
                        <div className="image-copetible" style={{ width: "400px", display: "block" }}>
                            <img src="https://www.plex.tv/wp-content/uploads/2020/03/avod-device-icons-1.png" alt="" />
                        </div>
                    </div>
                    <div className="second-copetible" style={{ width: "50%", paddingRight: "15px", display: "flex", alignItems: "center" }}>
                        <div className="imageright-copetible">
                            <img src="https://www.plex.tv/wp-content/uploads/2025/03/watch-free-compatible-devices-1024x610.png" alt="" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Competible