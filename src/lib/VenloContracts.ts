
import CreatorToken from "../contracts/CreatorToken.json";
import CreatorTokenFactory from "../contracts/CreatorTokenFactory.json";
import Repository from "../contracts/Repository.json";
import RepoFactory from "../contracts/RepoFactory.json";
import Ven from "../contracts/Ven.json";
import UserTable from "../contracts/UserTable.json";
import RepoTable from "../contracts/RepoTable.json";
import VenCrowdsale from "../contracts/Crowdsale.json";

export enum ChainId {
  Polygon = 137,
  Mumbai = 80001,
  Localhost = 1337,
};

const contracts = {
  [ChainId.Mumbai]: {
    CreatorToken: { abi: CreatorToken.abi },
    Repository: { abi: Repository.abi },

    CreatorTokenFactory: CreatorTokenFactory.networks[ChainId.Mumbai] && {
      abi: CreatorTokenFactory.abi,
      address: CreatorTokenFactory.networks[ChainId.Mumbai].address
    },
    RepoFactory: RepoFactory.networks[ChainId.Mumbai] && {
      abi: RepoFactory.abi,
      address: RepoFactory.networks[ChainId.Mumbai].address
    },
    Ven: Ven.networks[ChainId.Mumbai] && {
      abi: Ven.abi,
      address: Ven.networks[ChainId.Mumbai].address
    },
    UserTable: UserTable.networks[ChainId.Mumbai] && {
      abi: UserTable.abi,
      address: UserTable.networks[ChainId.Mumbai].address
    },
    RepoTable: RepoTable.networks[ChainId.Mumbai] && {
      abi: RepoTable.abi,
      address: RepoTable.networks[ChainId.Mumbai].address
    },
    VenCrowdsale: VenCrowdsale.networks[ChainId.Mumbai] && {
      abi: VenCrowdsale.abi,
      address: VenCrowdsale.networks[ChainId.Mumbai].address
    }
  }
};

export default contracts;
