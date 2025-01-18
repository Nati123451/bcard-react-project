import { FunctionComponent } from "react";
import TechUsed from "./tools/TechUsed";
import CardsAnalyst from "./tools/CardsAnalyst";
import AboutUsText from "./tools/AboutUsText";

interface AboutProps {

}

const About: FunctionComponent<AboutProps> = () => {
    return (<section className="container text-center">
        <h1>About <span className="logo">BCard</span > </h1>
        <AboutUsText />
        <div className="about-wraper">
            <TechUsed />
            <CardsAnalyst />
        </div>


    </section>);
}

export default About;