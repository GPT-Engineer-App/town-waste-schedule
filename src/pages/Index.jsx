import React, { useState, useEffect } from "react";
import { Container, Text, VStack, Select, Box, Grid, GridItem, Button } from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";

const garbageCollectionData = {
  町A: {
    燃えるごみ: [5, 12, 19, 26],
    燃えないごみ: [6, 20],
    資源ごみ: [7, 21],
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
                const isBurnable = garbageCollectionData[selectedTown].燃えるごみ.includes(date);
                const isNonBurnable = garbageCollectionData[selectedTown].燃えないごみ.includes(date);
                const isRecyclable = garbageCollectionData[selectedTown].資源ごみ.includes(date);

                return (
                  <GridItem key={date} w="100%" h="10" bg={isBurnable ? "red.200" : isNonBurnable ? "blue.200" : isRecyclable ? "green.200" : "gray.200"}>
                    <Text>{date}</Text>
                  </GridItem>
                );
              })}
            </Grid>
          </Box>
        )}
        {selectedTown && (
          <Box mt={4}>
            <Select placeholder="通知する日を選択" onChange={(e) => setNotificationDate(e.target.value)}>
              {[...Array(daysInMonth)].map((_, day) => {
                const date = day + 1;
                return (
                  <option key={date} value={date}>
                    {date}
                  </option>
                );
              })}
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
