import React, { useContext } from 'react';
import { SiteContext } from '../../context/SiteContext';
import './About.css';

const About = () => {
  const { data } = useContext(SiteContext);

  if (!data?.about) return null;

  return (
    <>
      <section className="about section-spacing">
        <div className="container">
          <div className="about__grid">
            <div className="about__content">
              <h1 className="about__title">{data.about.title}</h1>
              <div className="about__text">
                {data.about.content.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <div className="about__values">
                <div className="value">
                  <h3>Quality</h3>
                  <p>Never compromising on freshness or taste</p>
                </div>
                <div className="value">
                  <h3>Sustainability</h3>
                  <p>Growing in harmony with nature</p>
                </div>
                <div className="value">
                  <h3>Community</h3>
                  <p>Supporting local, thinking global</p>
                </div>
              </div>
            </div>
            <div className="about__image-container">
              <img 
                src={data.about.image} 
                alt="About our farm" 
                className="about__image"
              />
              <div className="about__image-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team section-spacing">
        <div className="container">
          <div className="team__header">
            <h2 className="team__title">Meet Our Team</h2>
            <p className="team__subtitle">
              Passionate individuals dedicated to growing the finest mushrooms
            </p>
          </div>
          
          <div className="team__grid">
            {data.team && data.team.map((member) => (
              <div key={member.id} className="team-member">
                <div className="team-member__image-container">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="team-member__image"
                  />
                  <div className="team-member__overlay">
                    <span className="team-member__role">{member.role}</span>
                  </div>
                </div>
                <div className="team-member__info">
                  <h3 className="team-member__name">{member.name}</h3>
                  <p className="team-member__bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;