export interface Chain {
  chain_id: string;
  network: string;
  has_transactions: boolean;
  has_dex_trades: boolean;
}

export interface SelectedItem {
  label: string;
}

interface ChainModel {
  selectedNetwork?: SelectedItem;
  selectedChain?: SelectedItem;
  selectedChainNetwork?: SelectedItem;
}

export default ChainModel;
