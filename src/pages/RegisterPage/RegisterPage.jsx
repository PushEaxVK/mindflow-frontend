// import React from 'react';
// import RegisterForm from '../../components/RegisterForm/RegisterForm';
// import Container from '../../components/Container/Container';
// import styles from './RegisterPage.module.css';

// const RegisterPage = () => {
//   return (
//     <section className={styles.pageWrapper}>
//       <Container>
//         <RegisterForm />
//       </Container>
//     </section>
//   );
// };

// export default RegisterPage;

import React from 'react';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import Container from '../../components/Container/Container';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  return (
    <section className={styles.pageWrapper}>
      <RegisterForm />
    </section>
  );
};

export default RegisterPage;
