import { getCurrentEpoch } from "../utils/util";
import { CONTRACT_ADDRESS } from "./config";
import { Product, UserDetails } from "./interfaces";
import { Contract, ethers } from "ethers";

const ContractABI = require("./SupplyChain.json");
const productList = require("./data-1.json");

declare let window: any;

export class SupplyChainService {
  private static instance: SupplyChainService;
  private _supplyChainContract!: Contract;
  private _accountAdress: string | undefined;

  // private constructor() {
  //   this._supplyChainContract = this.getContract(CONTRACT_ADDRESS);
  //   SupplyChainService.eventContract = this._supplyChainContract;
  // }
  public static getInstance(): SupplyChainService {
    if (!SupplyChainService.instance) {
      SupplyChainService.instance = new SupplyChainService();
    }
    return SupplyChainService.instance;
  }
  checkedWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return false;
      }
      await ethereum.enable();

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${Number(4).toString(16)}` }],
      });
      this._accountAdress = accounts[0];
      this._supplyChainContract = this.getContract();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  async ethEnabled() {
    return await this.checkedWallet();
  }

  getContract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, ContractABI["abi"], signer);
  }
  async getMyDetails(): Promise<UserDetails> {
    try {
      await this.ethEnabled();

      const _user: UserDetails = await this._supplyChainContract.getUserDetails(
        this._accountAdress
      );
      return _user;
    } catch (error) {
      console.log(error, "error");
      throw new Error("Error while fetching users detail");
    }
  }

  async getUserDetail(address: string): Promise<UserDetails> {
    try {
      await this.ethEnabled();
      const _user: UserDetails = await this._supplyChainContract.getUserDetails(
        address
      );
      return _user;
    } catch (error) {
      console.log(error, "error");
      throw new Error("Error while fetching users detail");
    }
  }
  async getAllProducts(): Promise<Product[]> {
    try {
      await this.ethEnabled();
      const _list = await this._supplyChainContract.getAllProducts();
      const productList: Product[] = _list;
      return productList;
    } catch (error) {
      console.log(error);
      throw new Error("Product list could not be fetched");
    }
  }

  async getMyProducts(): Promise<Product[]> {
    try {
      await this.ethEnabled();
      const _list = await this._supplyChainContract.getMyProducts();
      const productList: Product[] = _list;
      return productList;
    } catch (error) {
      console.log(error);
      throw new Error("My Product list could not be fetched");
    }
  }

  async getSingleProducts(productId: string): Promise<Product> {
    try {
      const data = await this._supplyChainContract.getSingleProduct(productId);
      const product: Product = data[0];
      const newProductData = { ...product, productHistory: data[1] };
      return newProductData;
    } catch (error) {
      throw new Error("Product could be fetched");
    }
  }

  async addProduct(product: Product): Promise<boolean> {
    try {
      await this.ethEnabled();
      // let data: Product = productList[17];
      const secondsSinceEpoch = getCurrentEpoch();
      product.manufacturerName = "Pfizer";
      product.manufacturer = this._accountAdress;
      console.log(product, "product");
      const addProduct = await this._supplyChainContract.addProduct(
        product,
        secondsSinceEpoch
      );
      return addProduct;
    } catch (error) {
      console.log("error", error);

      throw new Error("Product add failed!");
    }
  }

  async sellProduct(partyAddress: string, productId: string): Promise<boolean> {
    try {
      const secondsSinceEpoch = getCurrentEpoch();

      const sell = await this._supplyChainContract.sellProduct(
        partyAddress,
        productId,
        secondsSinceEpoch
      );

      return sell;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async addParty(party: UserDetails): Promise<boolean> {
    try {
      const addUser = await this._supplyChainContract.addParty(party);
      return addUser;
    } catch (error) {
      console.log(error);
      throw new Error("Users list could not be fetched");
    }
  }
  async getMyUsersList(): Promise<UserDetails[]> {
    try {
      await this.ethEnabled();
      const _list: UserDetails[] =
        await this._supplyChainContract.getMyUsersList();
      return _list;
    } catch (error) {
      console.log(error);
      throw new Error("Users list could not be fetched");
    }
  }
}
