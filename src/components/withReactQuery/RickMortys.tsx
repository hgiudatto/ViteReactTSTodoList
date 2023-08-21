"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { RickMorty } from "../../types/types.js";
import {
  GET_RICKMORTYS_KEY,
  getRickMortys,
} from "./getRickMortys.js";
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from "@chakra-ui/react";
const RickAndMortyCard = ({
  rickMorty,
}: {
  rickMorty: RickMorty;
}) => {
  return (
    <Card>
      <CardBody>
        <Flex justifyContent="center">
          <Image src={rickMorty?.image} borderRadius="lg" />
        </Flex>
        <Grid templateColumns={"repeat(2, 1fr)"} gap={4} mt={4}>
          <GridItem key={rickMorty.id}>
            <Stack direction={"row"}>
              <Breadcrumb pt="3">
                <BreadcrumbItem>
                  <Badge colorScheme="blue">{rickMorty.name}</Badge>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <Badge colorScheme="cyan">{rickMorty.gender}</Badge>
                </BreadcrumbItem>
              </Breadcrumb>
            </Stack>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

const RickMortys = ({
  rickMortys: initialData,
}: {
  rickMortys?: RickMorty[];
}) => {
  const { data: rickMortys, refetch } = useQuery(
    GET_RICKMORTYS_KEY,
    getRickMortys,
    { initialData }
  );
  console.log(`rickMortys: `, rickMortys);

  return (
    <div>
      <Text align={"center"} fontSize={"3xl"}>
        Rick And Morty List
      </Text>
      <Button onClick={() => refetch()}>
        Refetch Rick And Mortys
      </Button>
      <Grid
        templateColumns={"repeat(auto-fill, minmax(400px, 1fr))"}
        mt={4}
        gap={4}
      >
        {rickMortys?.map((rickMorty: RickMorty) => (
          <GridItem key={rickMorty.id} w="100%">
            <RickAndMortyCard
              key={rickMorty.id}
              rickMorty={rickMorty}
            />
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};

export default RickMortys;
