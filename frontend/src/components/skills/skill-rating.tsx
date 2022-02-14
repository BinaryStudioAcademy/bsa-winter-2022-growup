import './styles.scss';
import star from 'assets/img/icons/skill-icons/star.png';

interface SkillTypes {
    name: string
}

const SkillElement: React.FC<SkillTypes> = (props) => (
        <tr>
            <td className="align-middle">{props.name} <img alt="star" src={star}/></td>
            <td className="skill-rating text-center"><strong>
                <div className="container-progress-bar">
                    <div className="b-progress-bar position-relative text-center overflow-hidden">
                        <ProgressActive/>
                        <ProgressActive/>
                        <ProgressActive/>
                        <ProgressActive/>
                        <ProgressActive/>
                        <ProgressPassive/>
                        <ProgressPassive/>
                        <ProgressPassive/>
                        <span className="fs-4 d-inline-block align-middle position-absolute fw-bold">5</span>
                    </div></div>
                </strong></td>
            <td className="skill-rating text-center"><strong>
            <div className="container-progress-bar">
                    <div className="b-progress-bar position-relative text-center overflow-hidden">
                        <ProgressActive/>
                        <ProgressActive/>
                        <ProgressPassive/>
                        <ProgressPassive/>
                        <ProgressPassive/>
                        <ProgressPassive/>
                        <ProgressPassive/>
                        <ProgressPassive/>
                    <span className="fs-4 d-inline-block align-middle position-absolute fw-bold">2</span>
                    </div></div>
                </strong></td>
            <td className="skill-rating text-center"><strong>
            <div className="container-progress-bar">
                    <div className="b-progress-bar position-relative text-center overflow-hidden">
                        <ProgressPassive/>
                        <ProgressPassive/>
                        <ProgressPassive/>
                        <ProgressPassive/>
                        <ProgressPassive/>
                        <ProgressPassive/>
                        <ProgressPassive/>
                        <ProgressPassive/>
<span className="fs-4 text-gu-blue d-inline-block align-middle position-absolute fw-bold">+</span>
                    </div></div>
                </strong></td>
        </tr>
);

const ProgressActive: React.FC = () => (
    <>
        <div className="activeBlock"></div>
        <div className="activeBlock"></div>
        <div className="activeBlock"></div>
        <div className="activeBlock"></div>
    </>
);

const ProgressPassive: React.FC = () => (
    <>
        <div className="passiveBlock"></div>
        <div className="passiveBlock"></div>
        <div className="passiveBlock"></div>
        <div className="passiveBlock"></div>
    </>
);

export default SkillElement;
