import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import clsx from 'clsx';

import {
  selectModalIsOpen,
  selectModalType,
} from '../../redux/modal/selectors';
import { closeModal } from '../../redux/modal/slice';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

import Navigation from '../Navigation/Navigation';
import UserMenu from '../UserMenu/UserMenu';
import ButtonCreate from '../ButtonCreate/ButtonCreate';

import s from './ModalMenu.module.css';

const ModalMenu = () => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const dispatch = useDispatch();
  const isOpen = useSelector(selectModalIsOpen);
  const modalType = useSelector(selectModalType);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleClose = () => dispatch(closeModal());

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  if (modalType !== 'mobileMenu') return null;

  const setActiveClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

  return (
    <div
      className={clsx(s.overlay, {
        [s.show]: isOpen,
        [s.hide]: !isOpen,
      })}
      onClick={handleOverlayClick}
    >
      <div
        className={clsx(s.modal, {
          [s.slide__In]: isOpen,
          [s.slide__Out]: !isOpen,
        })}
      >
        <div className={s.modal__content}>
          <nav className={s.nav} onClick={handleClose}>
            <Navigation />
          </nav>

          <div className={s.bottom__section} onClick={handleClose}>
            {isLoggedIn ? (
              <div className={s.user__mobile}>
                {isMobile && <ButtonCreate />}
                <UserMenu />
              </div>
            ) : (
              <>
                {isMobile && (
                  <div className={s.auth__mobile}>
                    <nav className={s.auth__wrapper}>
                      <NavLink className={setActiveClass} to="/login">
                        Log In
                      </NavLink>
                      <NavLink
                        className={clsx(s.link, s.join__link)}
                        to="/register"
                      >
                        Join now
                      </NavLink>
                    </nav>
                  </div>
                )}
                {isTablet && (
                  <nav className={s.auth__tablet}>
                    <NavLink className={setActiveClass} to="/login">
                      Log In
                    </NavLink>
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalMenu;

// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';
// import { useMediaQuery } from 'react-responsive';
// import clsx from 'clsx';

// import {
//   selectModalIsOpen,
//   selectModalType,
// } from '../../redux/modal/selectors';
// import { closeModal } from '../../redux/modal/slice';
// import { selectIsLoggedIn } from '../../redux/auth/selectors';

// import Container from '../Container/Container';
// import Navigation from '../Navigation/Navigation';
// import UserMenu from '../UserMenu/UserMenu';
// import ButtonCreate from '../ButtonCreate/ButtonCreate';

// import s from './ModalMenu.module.css';

// const ModalMenu = () => {
//   const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439 });
//   const isMobile = useMediaQuery({ maxWidth: 767 });

//   const dispatch = useDispatch();
//   const isOpen = useSelector(selectModalIsOpen);
//   const modalType = useSelector(selectModalType);
//   const isLoggedIn = useSelector(selectIsLoggedIn);
//   const [isVisible, setIsVisible] = useState(false);

//   const setActiveClass = ({ isActive }) => {
//     return clsx(s.link, isActive && s.active);
//   };

//   useEffect(() => {
//     if (isOpen) {
//       setIsVisible(true);
//     } else {
//       const timer = setTimeout(() => setIsVisible(false), 300);
//       return () => clearTimeout(timer);
//     }
//   }, [isOpen]);

//   const handleClose = () => dispatch(closeModal());

//   const handleOverlayClick = (e) => {
//     if (e.target === e.currentTarget) handleClose();
//   };

//   if (!isVisible || modalType !== 'mobileMenu') return null;

//   return (
//     <div
//       className={clsx(s.overlay, { [s.show]: isOpen })}
//       onClick={handleOverlayClick}
//     >
//       <div className={clsx(s.modal, { [s.visible]: isOpen })}>
//         <div className={s.modal__content}>
//           <nav className={s.nav} onClick={handleClose}>
//             <Navigation />
//           </nav>

//           <div className={s.bottom__section} onClick={handleClose}>
//             {isLoggedIn ? (
//               <div className={s.user__mobile}>
//                 {isMobile && <ButtonCreate />}
//                 <UserMenu />
//               </div>
//             ) : (
//               <>
//                 {isMobile && (
//                   <div className={s.auth__mobile}>
//                     <nav className={s.auth__wrapper}>
//                       <NavLink className={setActiveClass} to="/login">
//                         Log In
//                       </NavLink>
//                       <NavLink
//                         className={clsx(s.link, s.join__link)}
//                         to="/register"
//                       >
//                         Join now
//                       </NavLink>
//                     </nav>
//                   </div>
//                 )}
//                 {isTablet && (
//                   <nav className={s.auth__tablet}>
//                     <NavLink className={setActiveClass} to="/login">
//                       Log In
//                     </NavLink>
//                   </nav>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ModalMenu;
