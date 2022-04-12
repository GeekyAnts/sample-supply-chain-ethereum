import {
  Button,
  FormControl,
  Heading,
  HStack,
  Radio,
  Select,
  Text,
  TextArea,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { Layout, ScreenHeader } from "../../components";
import { useApiCall } from "../../hooks/hooks";
import { Product } from "../../repository/interfaces";
import { toastError } from "../../utils/toastMessages";
import { getCustomDateEpoch } from "../../utils/util";
import { FormDate, FormInput, List } from "./components";
export type InputType = { id: string; value: string };

export function AddProductPage() {
  const { addMyProduct } = useApiCall();
  const [productDetails, setProductDetails] = useState<Product>({} as Product);
  const [manDate, setManDate] = useState("");
  const [expDate, setExpDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [ingredientList, setIngredientList] = useState<InputType[]>();
  const [sideEffectList, setSideEffectList] = useState<InputType[]>();
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  function handleIngredientList(data: InputType) {
    setIngredientList((curr) =>
      curr?.map((i) => {
        return i.id === data.id ? { id: data.id, value: data.value } : i;
      })
    );
  }

  function handleSideEffectList(data: InputType) {
    setSideEffectList((curr) =>
      curr?.map((i) => {
        return i.id === data.id ? { id: data.id, value: data.value } : i;
      })
    );
  }

  function isTextEntered(data: InputType[]) {
    if (data.length > 0) {
      return data[data.length - 1].value !== "" ? false : true;
    }
    return false;
  }

  function validate() {
    if (manDate === "" && expDate === "") {
      toastError("Man Date and Exp date required");
      return false;
    } else if (manDate > expDate) {
      toastError("Expiry date smaller than manufacture date");
      return false;
    } else if (!productDetails.name) {
      toastError("Product name cannot be empty");
      return false;
    } else if (productDetails.isInBatch && !productDetails.batchCount) {
      toastError("Batch count is need if batch selected");
      return false;
    } else if (!productDetails.barcodeId) {
      toastError("Product id cannot be empty");
      return false;
    } else if (productDetails.productImage === "") {
      toastError("Product url cannot be empty");
      return false;
    } else if (!validator.isURL(productDetails.productImage)) {
      toastError(" Invalid image Url");
      return false;
    } else if (!productDetails.productType) {
      toastError("Product type not selected");
      return false;
    } else if (!productDetails.scientificName) {
      toastError("Scientific name cannot be empty");
      return false;
    } else if (ingredientList === undefined || sideEffectList === undefined) {
      toastError("Ingredients or Side Effects not added");
      return false;
    } else if (!productDetails.usage) {
      toastError("Usage details not added");
      return false;
    }
    return true;
  }

  useEffect(() => {
    if (value === "batch") {
      setProductDetails((curr) => ({ ...curr, isInBatch: true }));
    } else if (value === "individual") {
      setProductDetails((curr) => ({ ...curr, isInBatch: false }));
    }
  }, [value]);

  const handleSubmit = async () => {
    try {
      if (validate()) {
        setLoading(true);
        const ingredients = [];
        if (ingredientList !== undefined) {
          for (let i = 0; i < ingredientList?.length; i++) {
            if (ingredientList[i].value) {
              ingredients.push(ingredientList[i].value);
            }
          }
        }
        const side_effects = [];
        if (sideEffectList !== undefined) {
          for (let i = 0; i < sideEffectList?.length; i++) {
            if (sideEffectList[i].value) {
              side_effects.push(sideEffectList[i].value);
            }
          }
        }

        const prodObject = {
          ...productDetails,
          composition: ingredients,
          sideEffects: side_effects,
        };

        console.log(prodObject, "i am herrrr");
        const result = await addMyProduct(prodObject);
        if (result) {
          setProductDetails({} as Product);
          setManDate("");
          setExpDate("");
          setIngredientList([]);
          setSideEffectList([]);
          navigate("/all-products");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <VStack mt="10">
        <ScreenHeader route="/all-products" text="Add Products" />
        <VStack
          minH="60vh"
          minW={["90vw", "50vw"]}
          justifyContent={"center"}
          alignItems="center"
          bg="white"
          borderRadius={"md"}
        >
          <VStack w={["90%", "60%"]} py="12">
            <Heading size="md" my="4">
              Main Information
            </Heading>
            <FormInput
              value={"Company Inc"}
              type="text"
              setFunction={(text: string) => console.log(text)}
              isDisabled={true}
              placeholder="Manufacturer Name"
            />
            <FormInput
              isDisabled={true}
              value={"Company@gmail.com"}
              type="text"
              setFunction={(text: string) => console.log(text)}
              placeholder="Manufacturer Email"
            />
            <FormDate
              value={manDate}
              setFunction={(text: string) => {
                setManDate(text);
                setProductDetails((curr) => ({
                  ...curr,
                  manDateEpoch: getCustomDateEpoch(text),
                }));
              }}
              placeholder="Manufacturing Date"
            />
            <FormDate
              value={expDate}
              setFunction={(text: string) => {
                setExpDate(text);
                setProductDetails((curr) => ({
                  ...curr,
                  expDateEpoch: getCustomDateEpoch(text),
                }));
              }}
              placeholder="Expires In (days)"
            />

            <FormInput
              value={productDetails.name}
              type="text"
              setFunction={(text: string) =>
                setProductDetails((curr) => ({ ...curr, name: text }))
              }
              placeholder="Product Name"
              errorMessage="Incorrect Value"
            />
            <FormControl>
              <FormControl.Label>Choose Product Type</FormControl.Label>
              <Radio.Group
                name="myRadioGroup"
                accessibilityLabel="favorite number"
                value={value}
                onChange={(nextValue) => {
                  setValue(nextValue);
                }}
              >
                <Radio value="individual" my={1}>
                  Individual
                </Radio>
                <Radio value="batch" my={1}>
                  Batch
                </Radio>
              </Radio.Group>
            </FormControl>
            {value === "batch" && (
              <FormInput
                value={productDetails.batchCount?.toString() ?? ""}
                type="text"
                setFunction={(text: string) =>
                  setProductDetails((curr) => ({
                    ...curr,
                    batchCount: +text,
                  }))
                }
                placeholder="Batch Size"
              />
            )}
            <FormInput
              value={productDetails.barcodeId}
              type="text"
              setFunction={(text: string) =>
                setProductDetails((curr) => ({ ...curr, barcodeId: text }))
              }
              placeholder={value === "batch" ? "Batch ID" : "Product ID"}
              errorMessage="Incorrect Value"
              helperText="A0123113345"
            />
            <FormInput
              value={productDetails.productImage}
              type="text"
              setFunction={(text: string) =>
                setProductDetails((curr) => ({ ...curr, productImage: text }))
              }
              placeholder="Product Image"
              errorMessage="Incorrect Value"
              helperText="https://www.w3schools.com/howto/img_avatar.png"
            />
            <Heading size="md" my="4">
              General Information
            </Heading>
            <FormControl mb="4">
              <FormControl.Label>Type</FormControl.Label>
              <Select
                accessibilityLabel="Choose Type"
                placeholder="Choose Type"
                _selectedItem={{
                  bg: "teal.600",
                }}
                mt="1"
                onValueChange={(value) => {
                  const index = [
                    "BCG",
                    "RNA",
                    "MRNA",
                    "MMR",
                    "Nasal Flu",
                  ].indexOf(value);
                  setProductDetails((curr) => ({
                    ...curr,
                    productType: index,
                  }));
                }}
              >
                {["BCG", "RNA", "MRNA", "MMR", "Nasal Flu"].map((item) => (
                  <Select.Item label={item} value={item} />
                ))}
              </Select>
            </FormControl>
            <FormInput
              value={productDetails.scientificName}
              type="text"
              setFunction={(text: string) =>
                setProductDetails((curr) => ({
                  ...curr,
                  scientificName: text,
                }))
              }
              placeholder="Scientific Name"
              errorMessage="Incorrect Value"
            />
            <FormControl mb="4">
              <HStack mb="2" justifyContent={"space-between"}>
                <FormControl.Label>Side effects</FormControl.Label>
                <Button
                  variant={"ghost"}
                  alignSelf="flex-start"
                  p="0"
                  isDisabled={sideEffectList && isTextEntered(sideEffectList)}
                  startIcon={<IoAddCircleOutline size="20" />}
                  onPress={() =>
                    setSideEffectList((curr = []) => [
                      ...curr,
                      { id: Date.now().toString(), value: "" },
                    ])
                  }
                >
                  <Text color="black">Add field</Text>
                </Button>
              </HStack>
              {sideEffectList &&
                sideEffectList.length > 0 &&
                sideEffectList.map(({ id, value }, idx) => (
                  <List
                    id={`${idx + 1}`}
                    value={value}
                    setFunction={(text: string) =>
                      handleSideEffectList({ id, value: text })
                    }
                  />
                ))}
            </FormControl>
            <FormControl mb="4">
              <HStack mb="2" justifyContent={"space-between"}>
                <FormControl.Label>Composition</FormControl.Label>
                <Button
                  variant={"ghost"}
                  alignSelf="flex-start"
                  p="0"
                  isDisabled={ingredientList && isTextEntered(ingredientList)}
                  startIcon={<IoAddCircleOutline size="20" />}
                  onPress={() =>
                    setIngredientList((curr = []) => [
                      ...curr,
                      { id: Date.now().toString(), value: "" },
                    ])
                  }
                >
                  <Text color="black">Add field</Text>
                </Button>
              </HStack>
              {ingredientList &&
                ingredientList.length > 0 &&
                ingredientList.map(({ id, value }, idx) => (
                  <List
                    id={`${idx + 1}`}
                    value={value}
                    setFunction={(text: string) =>
                      handleIngredientList({ id, value: text })
                    }
                  />
                ))}
            </FormControl>
            <FormControl mb="2">
              <FormControl.Label>Usage</FormControl.Label>
              <TextArea
                h="100"
                value={productDetails.usage}
                type="text"
                onChangeText={(text: string) =>
                  setProductDetails((curr) => ({ ...curr, usage: text }))
                }
                placeholder="Enter Usage Details"
              />
            </FormControl>

            {loading ? (
              <Button mt="4" isDisabled={true} bg="violet.700">
                loading...
              </Button>
            ) : (
              <Button
                onPress={() => {
                  handleSubmit();
                }}
                mt="4"
                bg="violet.700"
                _hover={{ bg: "violet.900" }}
              >
                Submit
              </Button>
            )}
          </VStack>
        </VStack>
      </VStack>
    </Layout>
  );
}
