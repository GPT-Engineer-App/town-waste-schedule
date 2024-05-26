import React, { useState, useEffect } from "react";
import { Container, Text, VStack, Select, Box, Grid, GridItem, Button } from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";

const garbageCollectionData = {
  町A: {
    可燃ごみ: [5, 12, 19, 26],
    プラスチック製容器包装: [6, 20],
    紙類: [7, 21],
    金物・ガラス類: [8, 22],
    埋立ごみ: [9, 23],
    水銀ごみ: [10, 24],
    粗大ごみ: [11, 25],
    ペットボトル: [12, 26],
  },
  町B: {
    燃えるごみ: [4, 11, 18, 25],
    燃えないごみ: [5, 19],
    資源ごみ: [6, 20],
  },
};

const Index = () => {
  const [selectedTown, setSelectedTown] = useState("");
  const [notificationDate, setNotificationDate] = useState("");

  const handleTownChange = (event) => {
    setSelectedTown(event.target.value);
  };

  const handleNotification = () => {
    if (notificationDate) {
      new Notification("ごみ収集日通知", {
        body: `${selectedTown}のごみ収集日: ${notificationDate}`,
      });
    }
  };

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const daysInMonth = 31;

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">松山市ごみ収集カレンダー</Text>
        <Select placeholder="町を選択" onChange={handleTownChange}>
          {Object.keys(garbageCollectionData).map((town) => (
            <option key={town} value={town}>
              {town}
            </option>
          ))}
        </Select>
        {selectedTown && (
          <Box>
            <Text fontSize="xl">{selectedTown}のごみ収集日</Text>
            <Grid templateColumns="repeat(7, 1fr)" gap={4}>
              {[...Array(daysInMonth)].map((_, day) => {
                const date = day + 1;
                const isBurnable = garbageCollectionData[selectedTown].可燃ごみ.includes(date);
                const isPlastic = garbageCollectionData[selectedTown].プラスチック製容器包装.includes(date);
                const isPaper = garbageCollectionData[selectedTown].紙類.includes(date);
                const isMetalGlass = garbageCollectionData[selectedTown].金物・ガラス類.includes(date);
                const isLandfill = garbageCollectionData[selectedTown].埋立ごみ.includes(date);
                const isMercury = garbageCollectionData[selectedTown].水銀ごみ.includes(date);
                const isLarge = garbageCollectionData[selectedTown].粗大ごみ.includes(date);
                const isPetBottle = garbageCollectionData[selectedTown].ペットボトル.includes(date);

                return (
                  <GridItem key={date} w="100%" h="10" bg={isBurnable ? "red.200" : isPlastic ? "yellow.200" : isPaper ? "orange.200" : isMetalGlass ? "blue.200" : isLandfill ? "brown.200" : isMercury ? "purple.200" : isLarge ? "pink.200" : isPetBottle ? "green.200" : "gray.200"}>
                    <Text>{date}</Text>
                  </GridItem>
                );
              })}
            </Grid>
          </Box>
        )}
        {selectedTown && (
          <Box mt={4}>
            <Select placeholder="通知するごみの種類を選択" onChange={(e) => setNotificationDate(e.target.value)}>
              {["可燃ごみ", "プラスチック製容器包装", "紙類", "金物・ガラス類", "埋立ごみ", "水銀ごみ", "粗大ごみ", "ペットボトル"].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
            <Button leftIcon={<FaBell />} colorScheme="teal" mt={2} onClick={handleNotification}>
              通知を設定
            </Button>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
