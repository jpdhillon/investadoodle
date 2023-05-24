import React from 'react';
import styles from '@/styles/Footer.module.css';
import Image from 'next/image';
import Link from 'next/link'; 

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span className={styles.disclaimer}>This website is a programming project. It is not intended to be investment advice. </span>
    </footer>
  );
};

export default Footer;