interface SkillTypes {
    name: string
}

const SkillElement: React.FC<SkillTypes> = (props) => (
        <tr>
            <td>{props.name}</td>
            <td className="skill-rating text-gu-black"><strong>4</strong></td>
            <td className="skill-rating"><strong>4</strong></td>
            <td className="skill-rating"><strong>4</strong></td>
        </tr>
);

export default SkillElement;
