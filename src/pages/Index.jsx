import React, { useState, useEffect } from "react";
import { Container, Text, VStack, Select, Box, Alert, AlertIcon, Button } from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";

// ごみ収集日データ（例として一部の町のデータを記載）
const garbageCollectionData = {
  町A: {
    燃えるごみ: ["5月5日", "5月12日", "5月19日", "5月26日"],
    燃えないごみ: ["5月6日", "5月20日"],
    資源ごみ: ["5月7日", "5月21日"],
  },
  町B: {
    燃えるごみ: ["5月4日", "5月11日", "5月18日", "5月25日"],
    燃えないごみ: ["5月5日", "5月19日"],
    資源ごみ: ["5月6日", "5月20日"],
  },
  // 他の町のデータも同様に追加
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
            {Object.entries(garbageCollectionData[selectedTown]).map(([type, dates]) => (
              <Box key={type} mt={2}>
                <Text fontWeight="bold">{type}</Text>
                {dates.map((date) => (
                  <Text key={date}>{date}</Text>
                ))}
              </Box>
            ))}
          </Box>
        )}
        {selectedTown && (
          <Box mt={4}>
            <Select placeholder="通知する日を選択" onChange={(e) => setNotificationDate(e.target.value)}>
              {Object.values(garbageCollectionData[selectedTown])
                .flat()
                .map((date) => (
                  <option key={date} value={date}>
                    {date}
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
