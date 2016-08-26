import React, { Component, PropTyes } from 'react';
import ReactDOM from 'react-dom';
import Icon from '/imports/ui/components/icon/component';
import Button from '/imports/ui/components/button/component';
import classNames from 'classnames';
import styles from './styles';
import { FormattedMessage } from 'react-intl';
import SettingsModal from '../modals/settings/component';
import SessionMenu from '../modals/settings/submenus/session/component';
import DropdownWrapper from '../dropdown/dropdown-wrapper/component';
import DropdownTrigger from '../dropdown/dropdown-trigger/component';
import DropdownContent from '../dropdown/dropdown-content/component';

export default class SettingsDropdown extends Component {
  constructor(props) {
    super(props);
    this.menus = [];
    this.openWithKey = this.openWithKey.bind(this);
  }

  componentWillMount() {
    /* Fill this with your menu items */
    this.setState({ activeMenu: -1, focusedMenu: 0, });
    this.menus.push({ className: '',
        props: { title: 'Fullscreen', prependIconName: 'icon-', icon: 'bbb-full-screen',
                ariaLabelleby: 'fullscreenLabel', ariaDescribedby:'fullscreenDesc', },
        tabIndex: 1, });
    this.menus.push({ className: SettingsModal,
        props: { title: 'Settings', prependIconName: 'icon-', icon: 'bbb-more',
                ariaLabelleby: 'settingsLabel', ariaDescribedby:'settingsDesc', },
        tabIndex: 2, });
    this.menus.push({ className: SessionMenu,
        props: { title: 'Leave Session', prependIconName: 'icon-', icon: 'bbb-logout',
                ariaLabelleby: 'leaveSessionLabel', ariaDescribedby:'leaveSessionDesc', },
        tabIndex: 3, });
  }

  componentWillUpdate() {
    /* Reset each menuitem so it can be selected again */
    const DROPDOWN = this.refs.dropdown;
    if (DROPDOWN.state.isMenuOpen && this.state.activeMenu >= 0) {
      this.setState({ activeMenu: -1, focusedMenu: 0, });
    }
  }

  setFocus() {
    ReactDOM.findDOMNode(this.refs[`menu${this.state.focusedMenu}`]).focus();
  }

  handleListKeyDown(event) {
    const pressedKey = event.keyCode;
    let numOfMenus = this.menus.length - 1;

    // User pressed tab
    if (pressedKey === 9) {
      let newIndex = 0;
      if (this.state.focusedMenu >= numOfMenus) { // Checks if at end of menu
        newIndex = 0;
        if (!event.shiftKey) {
          this.refs.dropdown.hideMenu();
        }
      } else {
        newIndex = this.state.focusedMenu;
      }

      this.setState({ focusedMenu: newIndex, });
      return;
    }

    // User pressed shift + tab
    if (event.shiftKey && pressedKey === 9) {
      let newIndex = 0;
      if (this.state.focusedMenu <= 0) { // Checks if at beginning of menu
        newIndex = numOfMenus;
      } else {
        newIndex = this.state.focusedMenu - 1;
      }

      this.setState({ focusedMenu: newIndex, });
      return;
    }

    // User pressed up key
    if (pressedKey === 38) {
      if (this.state.focusedMenu <= 0) { // Checks if at beginning of menu
        this.setState({ focusedMenu: numOfMenus, },
           () => { this.setFocus(); });
      } else {
        this.setState({ focusedMenu: this.state.focusedMenu - 1, },
           () => { this.setFocus(); });
      }

      return;
    }

    // User pressed down key
    if (pressedKey === 40) {
      if (this.state.focusedMenu >= numOfMenus) { // Checks if at end of menu
        this.setState({ focusedMenu: 0, },
           () => { this.setFocus(); });
      } else {
        this.setState({ focusedMenu: this.state.focusedMenu + 1, },
           () => { this.setFocus(); });
      }

      return;
    }

    // User pressed enter and spaceBar
    if (pressedKey === 13 || pressedKey === 32) {
      this.clickMenu(this.state.focusedMenu);
      return;
    }

    //User pressed ESC
    if (pressedKey == 27) {
      this.setState({ activeMenu: -1, focusedMenu: 0, });
      this.refs.dropdown.hideMenu();
    }

    return;
  }

  handleFocus(index) {
    this.setState({ focusedMenu: index, },
       () => { this.setFocus(); });
  }

  clickMenu(i) {
    this.setState({ activeMenu: i, });
    this.refs.dropdown.hideMenu();
  }

  createMenu() {
    const curr = this.state.activeMenu;

    switch (curr) {
      case 0:
        console.log(this.menus[curr].props.title);
        break;
      case 1:
        return <SettingsModal />;
        break;
      case 2:
        return <SessionMenu />;
        break;
      default:
        return;
    }
  }

  openWithKey(event) {
    // Focus first menu option
    if (event.keyCode === 9) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.setState({ focusedMenu: 0 }, () => { this.setFocus(); });
  }

  renderAriaLabelsDescs() {
    return (
      <div>
        {/* aria-labelledby for the whole component */}
        <p id="optionsLabel" hidden>
          <FormattedMessage
            id="app.dropdown.optionsLabel"
            description="Aria label for Options"
            defaultMessage="Options"
          />
        </p>
        <p id="fullscreenLabel" hidden>
        <FormattedMessage
          id="app.dropdown.fullscreenLabel"
          description="Aria label for fullscreen"
          defaultMessage="Make fullscreen"
        />
        </p>
        <p id="settingsLabel" hidden>
          <FormattedMessage
            id="app.dropdown.settingsLabel"
            description="Aria label for settings"
            defaultMessage="Open Settings"
          />
        </p>
        <p id="leaveSessionLabel" hidden>
          <FormattedMessage
            id="app.dropdown.leaveSessionLabel"
            description="Aria label for logout"
            defaultMessage="Logout"
          />
        </p>

        {/* aria-describedby for the whole component */}
        <p id="optionsDesc" hidden>
          <FormattedMessage
            id="app.dropdown.optionsDesc"
            description="Aria description for Options"
            defaultMessage="Open options"
          />
        </p>
        <p id="fullscreenDesc" hidden>
        <FormattedMessage
          id="app.dropdown.fullscreenDesc"
          description="Aria description for fullscreen"
          defaultMessage="Make the settings menu fullscreen"
        />
        </p>
        <p id="settingsDesc" hidden>
          <FormattedMessage
            id="app.dropdown.settingsDesc"
            description="Aria description for settings"
            defaultMessage="Change the general settings"
          />
        </p>
        <p id="leaveSessionDesc" hidden>
          <FormattedMessage
            id="app.dropdown.leaveSessionDesc"
            description="Aria description for logout"
            defaultMessage="Leave the meeting"
          />
        </p>
      </div>
    );

  }

  render() {

    return (
      <div>
        {/* DropdownWrapper contains DropdownTrigger and DropdownContent */}
        <DropdownWrapper
          ref='dropdown'
          focusMenu={this.openWithKey}
          aria-labelledby='optionsLabel'
          aria-describedby='optionsDesc'>

          {/* Trigger to open dropdown menu */}
          <DropdownTrigger
            styleBtn={styles}
            labelBtn='setting'
            iconBtn='more'
            ghostBtn={true}
            hideBtn={true}/>

          {/* Content for the dropdown menu.
              onKeyDown : To remove lag if user holds key down */}
          <DropdownContent>
            <div className={styles.triangleOnDropdown}></div>
            <div className={styles.dropdownActiveContent}>
              <ul className={styles.menuList} role="menu">
                {this.menus.map((value, index) => (
                  <li
                    key={index}
                    role='menuitem'
                    tabIndex={value.tabIndex}
                    onClick={this.clickMenu.bind(this, index)}
                    onKeyDown={this.handleListKeyDown.bind(this)}
                    onFocus={this.handleFocus.bind(this, index)}
                    ref={'menu' + index}
                    className={styles.settingsMenuItem}
                    aria-labelledby={value.props.ariaLabelleby}
                    aria-describedby={value.props.ariaDescribedby}>

                    <Icon
                      key={index}
                      prependIconName={value.props.prependIconName}
                      iconName={value.props.icon}
                      title={value.props.title}
                      className={styles.iconColor}/>

                    {/* Below is the label for each menuitem because this is not using Button
                        Using Button in a list confuses the screen reader.
                        (Complies with WAI-ARIA) */}
                    <span className={styles.settingsMenuItemText}>{value.props.title}</span>

                    {/* Dividing line after the first menuitem */}
                    {index == '0' ? <hr className={styles.hrDropdown}/> : null}
                  </li>
                ))}
              </ul>
              {this.renderAriaLabelsDescs()}
            </div>
          </DropdownContent>
        </DropdownWrapper>
        {this.createMenu()}
      </div>
    );
  }
}
