import React, { useEffect, useState, Fragment } from "react";
import { useParams } from 'react-router-dom'
import TransferModal from './Utility/Transfer'
import MintModal from './Utility/Mint'
import FreezeModal from './Utility/Freeze'
import BurnModal from './Utility/Burn'
import TabControls from './TabControls';
import "../CSS/SikkaLandingPage.scss"

const getProvider = () => {
  if ("solana" in window) {
    const provider = (window).solana;
    if (provider.isPhantom) {
      return provider;
    }
  }
};

function TokenDashboard(props) {

  const provider = getProvider();
  const { id } = useParams();

  const COIN_MANAGE_LABELS = {
    transfer: 'transfer',
    mint: 'mint',
    freeze: 'freeze',
    burn: 'burn',
  }
  const COIN_MANAGE_TABS = [
    {
      label: 'Transfer',
      key: 'transfer',
      value: 0,
    },
    {
      label: 'Mint',
      key: 'mint',
      value: 1,
    },
    {
      label: 'Freeze',
      key: 'freeze',
      value: 2,
    },
    {
      label: 'Burn',
      key: 'burn',
      value: 3,
    },
  ]
  const [activeTab, setActiveTab] = useState(COIN_MANAGE_TABS[0]);

  const handleTabClick = (item) => {
    setActiveTab(item);
  }
  const renderTabContent = () => {
    let tabNode;
    switch (activeTab.key) {
      case COIN_MANAGE_LABELS.transfer:
        tabNode = (
          <TransferModal provider={provider} mintAddress={id} />
        );
        break;
      case COIN_MANAGE_LABELS.mint:
        tabNode = (
          <MintModal provider={provider} mintAddress={id} />
        )
        break;
      case COIN_MANAGE_LABELS.freeze:
        tabNode = (
          <FreezeModal provider={provider} mintAddress={id} />
        )
        break;
      case COIN_MANAGE_LABELS.burn:
        tabNode = (
          <BurnModal provider={provider} mintAddress={id} />
        )
        break;

    }
    return tabNode;
  }
  useEffect(() => {
  })
  return (
    <Fragment>
      <div className='main-container'>
        <TabControls
          menuItems={COIN_MANAGE_TABS}
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

export default TokenDashboard