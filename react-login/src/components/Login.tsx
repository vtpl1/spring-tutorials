// https://github.com/bezkoder/react-hook-form-typescript/blob/master/src/App.tsx
// https://github.com/amandeepmittal/blog-examples/blob/master/react/loginform-chakra-ui-complete/src/pages/Login.js
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import ThemeToggler from "./ThemeToggler";
import { useLocation } from "react-router-dom";

type FormValues = {
  email: string;
  password: string;
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
});

export default function SplitScrenLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (values: FormValues) => {
    return new Promise<void>(() => {
      setIsLoading(true);
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setIsLoading(false);
        reset();
      }, 3000);
    });
  };

  const location = useLocation();

  // new URLSearchParams(location.search).get('name')}
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex
        p={8}
        flex={1}
        align={"center"}
        justify={"center"}
        justifyContent={"space-between"}
      >
        <Image
          ml={"auto"}
          maxH={"md"}
          alt={"Login Image"}
          objectFit={"cover"}
          src={"/videonetics.svg"}
        />
      </Flex>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Box
          p={8}
          maxWidth="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4} w={"full"} maxW={"md"}>
              <HStack>
                <Heading fontSize={"2xl"}>Log in to your account</Heading>
                <ThemeToggler />
              </HStack>
              <FormControl isRequired isInvalid={errors.email ? true : false}>
                <FormLabel>Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="yourname@domain.com"
                  {...register("email")}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={errors.password ? true : false}
              >
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="*******"
                    {...register("password")}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      id="showPassword"
                      h="1.75rem"
                      size="sm"
                      aria-label="Show password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
              <Stack spacing={6}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.500"}>Forgot password?</Link>
                </Stack>
                <Button
                  id="login"
                  colorScheme={"blue"}
                  variant={"outline"}
                  type="submit"
                >
                  {isLoading ? (
                    <CircularProgress
                      isIndeterminate
                      size="24px"
                      color="blue"
                    />
                  ) : (
                    "Log in"
                  )}
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Flex>
    </Stack>
  );
}
