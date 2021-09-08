/* eslint-disable default-case */
import React, { useState, useRef, Fragment } from 'react';
import TabControls from './TabControls';
import TokenCreator from './token.jsx';
import FanCoinPage from './FanCoinPage.js';
import "../CSS/SikkaLandingPage.scss"

function SikkaLandingPage(props) {
     const COIN_TYPE_LABELS = {
        social:'social',
        fan:'fan',
      }
       const COIN_TYPE_TABS = [
        {
          label: 'Social Coins',
          key: 'social',
          value: 0,
        },
        {
          label: 'Fan Coins',
          key: 'fan',
          value: 1,
        },
      ]

    const [activeTab, setActiveTab] = useState(COIN_TYPE_TABS[0]);

    const handleTabClick = (item) => {
        setActiveTab(item);
    }
    const renderTabContent = () => {
        let tabNode;
        switch (activeTab.key) {
            case COIN_TYPE_LABELS.social :
                tabNode = (
                    <TokenCreator setToken=  {props.setToken} provider = {props.provider}/>
                );
                break;
            case COIN_TYPE_LABELS.fan :
                tabNode = (
                    <FanCoinPage />
                )
                break;
        }
        return tabNode;
    }
    return (
        <Fragment>
        <div className = 'main-container bg-white font-sans shadow-lg rounded-lg p-8'>
            <TabControls
                menuItems={COIN_TYPE_TABS}
                selectedItem={activeTab}
                containerClassName="searchResultMenu"
                hidden={false}
                onMenuItemClick={handleTabClick}
            />
            <div className="tabContainer">
                <div className="tabs">
                    {renderTabContent()}
                </div>
            </div>
         </div>
        </Fragment>
    )
}

export default SikkaLandingPage;
