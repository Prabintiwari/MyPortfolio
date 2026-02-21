import { useEffect, useState } from "react";
import { serviceService } from "../services/serviceService";
import { Service } from "../types/services.types";

export const useService = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      setError("");
      setLoading(true);
      try {
        const data = await serviceService.getAll({
          isActive: true,
        });

        setServices(data.data.services);
      } catch (error: any) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Failed to load services";
        setError(message);
        console.error("Services fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, error, loading };
};
