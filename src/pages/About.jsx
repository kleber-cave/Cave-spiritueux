import React from 'react';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>About</h1>
      </header>
      <main>
        <p>This is the About page for Ma Cave à Spiritueux.</p>
      </main>
    </div>
  );
};

export default About;
