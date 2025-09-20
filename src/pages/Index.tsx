import { Helmet } from "react-helmet";
import MessengerLayout from "@/components/MessengerLayout";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Crestmy - Мессенджер</title>
        <meta name="description" content="Современный мессенджер для комфортного общения" />
      </Helmet>
      
      <MessengerLayout />
    </div>
  );
};

export default Index;