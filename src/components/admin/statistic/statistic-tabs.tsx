"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatisticUser } from "./statistic-user";
import { StatisticOrder } from "./statistic-order";
import { Order, User } from "@prisma/client";

interface Props {
  className?: string;
}

interface StateProps {
  users: User[];
  orders: Order[];
}

export const StatisticTabs: React.FC<Props> = (props) => {
  const { className } = props;
  const [data, setData] = React.useState<StateProps>({ orders: [], users: [] });
  React.useEffect(() => {
    async function fetchData() {
      const [users, orders] = await Promise.all([
        (await fetch(process.env.NEXT_PUBLIC_API_URL + "/users")).json(),
        (await fetch(process.env.NEXT_PUBLIC_API_URL + "/orders")).json(),
      ]);
      setData({ users, orders });
    }
    fetchData();
  }, []);

  return (
    <Tabs defaultValue="user" className={cn("", className)}>
      <TabsList>
        <TabsTrigger value="user">users</TabsTrigger>
        <TabsTrigger value="order">orders</TabsTrigger>
      </TabsList>
      <TabsContent value="user">
        <StatisticUser data={data.users} />
      </TabsContent>
      <TabsContent value="order">
        <StatisticOrder data={data.orders} />
      </TabsContent>
    </Tabs>
  );
};
