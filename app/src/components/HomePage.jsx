import backgroundImage from "../images/landing-page-bg.jpg";
import logo from "../images/logo.png";

export const HomePage = () => {
  return (
    <div
      className="landing-page"
      style={{
        height: "93.9vh",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        backgroundSize: "100%, 100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={logo}
        alt="logo"
        style={{ position: "absolute", top: "15vh", width: "360px" }}
      />
      <h1
        style={{
          color: "white",
          position: "absolute",
          top: "25vh",
          fontSize: "6rem",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        <div style={{ fontFamily: "Roboto Slab" }}>Build your dream team,</div>
        <div style={{ fontFamily: "Roboto", marginTop: "-8px" }}>
          {" "}
          lead them to glory
        </div>
      </h1>
      <div style={{ position: "absolute", top: "63vh" }}>
        <p
          style={{
            fontSize: "2rem",
            fontFamily: "Roboto",
            color: "white",
            fontWeight: "500",
          }}
        >
          Sign Up or Log In to start playing
        </p>
        <button
          style={{
            fontFamily: "Roboto",
            fontSize: "1.4rem",
            fontWeight: "500",
            margin: "2vh",
            width: "12vw",
            height: "6vh",
            backgroundColor: "#ffa857",
            color: "#000",
            padding: "1rem",
            borderRadius: "32px",
            border: "none",
          }}
        >
          Log In / Sign Up
        </button>
      </div>
    </div>
  );
};
