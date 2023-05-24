import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <div className={styles.logo}>
          <h1>Investadoodle</h1>
          <Image src="/chart-line-upW.svg" alt="Investadoodle Logo" width={100} height={100}/>
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
