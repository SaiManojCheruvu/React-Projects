import React from 'react';
import './App.css';

interface SkillProps {
  skill: string;
  level: string;
  color: string;
}

const skills: SkillProps[] = [
  { skill: "HTML", level: "Intermediate", color: "#e34c26" },
  { skill: "CSS", level: "Advanced", color: "#264de4" },
  { skill: "JavaScript", level: "Advanced", color: "#f0db4f" },
  { skill: "React", level: "Advanced", color: "#61dafb" },
  { skill: "Node.js", level: "Intermediate", color: "#68a063" },
  { skill: "TypeScript", level: "Advanced", color: "#3178c6" },
  { skill: "Python", level: "Intermediate", color: "#3572A5" },
  { skill: "Java", level: "Intermediate", color: "#b07219" },
];

const App: React.FC = () => {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        <SkillList />
      </div>
    </div>
  );
};

const Avatar: React.FC = () => {
  return <img className='avatar' src='./Profile.jpg' alt='Manoj Profile' />;
};

const Intro: React.FC = () => {
  return (
    <div>
      <h1>Sai Manoj Cheruvu</h1>
      <p>
        Hello, I'm Sai Manoj Cheruvu, a passionate software developer with a focus on front-end technologies. I hold an MS in Computer Science from the University of Massachusetts, Boston, and a BTech in Electronics and Computer Engineering from Sreenidhi Institute of Science and Technology. My experience includes internships at Acceleron Learning, Cognizant, and Zoho Corp, where I developed scalable applications and optimized cloud solutions. I'm skilled in JavaScript, TypeScript, React, and AWS, and I thrive on creating intuitive and engaging user interfaces. I'm excited to bring my expertise and enthusiasm to innovative projects and teams.
      </p>
    </div>
  );
};

const SkillList: React.FC = () => {
  return (
    <div>
      {skills.map((skill) => (
        <Skill key={skill.skill} skill={skill.skill} color={skill.color} level={skill.level} />
      ))}
    </div>
  );
};

const Skill: React.FC<SkillProps> = ({ skill, color, level }) => {
  return (
    <div className='skill' style={{ backgroundColor: color }}>
      <span>{skill}</span>
      <span>{level}</span>
    </div>
  );
};

export default App;
