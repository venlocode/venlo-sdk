
import CreatorToken from "../contracts/CreatorToken.json";
import CreatorTokenFactory from "../contracts/CreatorTokenFactory.json";
import Repository from "../contracts/Repository.json";
import RepoFactory from "../contracts/RepoFactory.json";
import Ven from "../contracts/Ven.json";
import UserTable from "../contracts/UserTable.json";
import RepoTable from "../contracts/RepoTable.json";

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
  },
  [ChainId.Localhost]: {
    CreatorToken: { abi: CreatorToken.abi },
    Repository: { abi: Repository.abi },

    CreatorTokenFactory: CreatorTokenFactory.networks[ChainId.Localhost] && {
      abi: CreatorTokenFactory.abi,
      address: CreatorTokenFactory.networks[ChainId.Localhost].address
    },
    RepoFactory: RepoFactory.networks[ChainId.Localhost] && {
      abi: RepoFactory.abi,
      address: RepoFactory.networks[ChainId.Localhost].address
    },
    Ven: Ven.networks[ChainId.Localhost] && {
      abi: Ven.abi,
      address: Ven.networks[ChainId.Localhost].address
    },
    UserTable: UserTable.networks[ChainId.Localhost] && {
      abi: UserTable.abi,
      address: UserTable.networks[ChainId.Localhost].address
    },
    RepoTable: RepoTable.networks[ChainId.Localhost] && {
      abi: RepoTable.abi,
      address: RepoTable.networks[ChainId.Localhost].address
    },
  }
};

export default contracts;
