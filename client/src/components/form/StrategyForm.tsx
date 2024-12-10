import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { StrategyDto } from "../../types/StrategyDto";
import APIClient from "../../util/APIClient";
import { toast } from "react-toastify";

export interface StrategyFormProp {
  strategy: StrategyDto | null;
  loadAllStrategies: () => void;
}

export const StrategyForm: React.FC<StrategyFormProp> = ({ strategy, loadAllStrategies }) => {
  // for testing purposes
  const defaultStrategy: StrategyDto = {
    id: 0,
    name: "",
    type: "",
    comment: "",
    description: "",
    marketType: "",
    marketCondition: "",
    riskLevel: "",
    winRate: 0,
    totalTrades: 0,
    lastModifiedDate: new Date(),
    userId: 0,
  };

  const [strategyFormData, setStrategyFormData] = useState<StrategyDto>(
    strategy || defaultStrategy
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = (fieldName: string, value: string): boolean => {
    switch (fieldName) {
      case "name":
      case "type":
      case "comment":
      case "description":
      case "marketType":
      case "marketCondition":
      case "riskLevel":
        return !!value;
      default:
        return true;
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;

    // Update form data
    setStrategyFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove the error for the specific field if the value is valid
    setErrors((prevErrors) => {
      const { [name]: removedError, ...remainingErrors } = prevErrors; // Destructure to remove the specific error
      return validateField(name, value) ? remainingErrors : prevErrors;
    });
  };

  // Validate the form
  const validate = () => {
    const validationErrors: { [key: string]: string } = {};
    const requiredFields = [
      "name",
      "type",
      "comment",
      "description",
      "marketType",
      "marketCondition",
      "riskLevel",
    ];

    requiredFields.forEach((field) => {
      if (!strategyFormData[field as keyof StrategyDto]) {
        validationErrors[field] = `${field} is required`;
      }
    });

    return validationErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (strategy?.id) {
      updateStrategy();
    } else {
      saveStrategy();
    }
  };

  // Save strategy
  const saveStrategy = () => {
    const { id, ...dataWithoutId } = strategyFormData;

    APIClient.post("/strategies", dataWithoutId, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        loadAllStrategies();
        toast.success("Strategy saved successfully!");
        console.log("Strategy saved successfully:", response.data);
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "Unknown error occurred";
        console.error("Failed to save strategy: ", errorMessage);
        toast.error(errorMessage);
      });
  };

  // Clear form
  const clearForm = () => {
    setStrategyFormData(defaultStrategy);
    setErrors({});
  };

  // Update strategy
  const updateStrategy = () => {
    if (!strategy?.id) {
      toast.error("Strategy ID is missing.");
      return;
    }

    APIClient.put(`/strategies/${strategy.id}`, strategyFormData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        loadAllStrategies();
        toast.success("Strategy updated successfully!");
        clearForm();
        console.log("Strategy updated successfully:", response.data);
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "Unknown error occurred";
        console.error("Failed to update strategy:", errorMessage);
        toast.error(`Failed to update strategy: ${errorMessage}`);
      });
  };

  useEffect(() => {
    setStrategyFormData(strategy || defaultStrategy);
  }, [strategy]);

  return (
    <Box className="max-w-4xl mx-auto p-4" sx={{ maxWidth: "600px" }}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Name"
            size="small"
            type="text"
            name="name"
            value={strategyFormData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            required
          />
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <FormControl fullWidth size="small" required error={!!errors.type}>
            <InputLabel>Type</InputLabel>
            <Select
              name="type"
              value={strategyFormData.type}
              onChange={handleChange}
            >
              <MenuItem value="Scalping">Scalping</MenuItem>
              <MenuItem value="Swing Trading">Swing Trading</MenuItem>
              <MenuItem value="Day Trading">Day Trading</MenuItem>
              <MenuItem value="Position Trading">Position Trading</MenuItem>
              <MenuItem value="Range Trading">Range Trading</MenuItem>
            </Select>
            <Box sx={{ color: "red" }}>{errors.type}</Box>
          </FormControl>
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Comment"
            size="small"
            type="text"
            name="comment"
            value={strategyFormData.comment}
            onChange={handleChange}
            multiline
            rows={4}
            error={!!errors.comment}
            helperText={errors.comment}
            fullWidth
            required
          />
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Description"
            size="small"
            type="text"
            name="description"
            value={strategyFormData.description}
            onChange={handleChange}
            multiline
            rows={4}
            error={!!errors.description}
            helperText={errors.description}
            fullWidth
            required
          />
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <FormControl
            fullWidth
            size="small"
            required
            error={!!errors.marketType}
          >
            <InputLabel>Market Type</InputLabel>
            <Select
              name="marketType"
              value={strategyFormData.marketType}
              onChange={handleChange}
            >
              <MenuItem value="Stocks">Stocks</MenuItem>
              <MenuItem value="Crypto">Crypto</MenuItem>
              <MenuItem value="Forex">Forex</MenuItem>
              <MenuItem value="Commodities">Commodities</MenuItem>
            </Select>
            <Box sx={{ color: "red" }}>{errors.marketType}</Box>
          </FormControl>
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <FormControl
            fullWidth
            size="small"
            required
            error={!!errors.marketCondition}
          >
            <InputLabel>Market Condition</InputLabel>
            <Select
              name="marketCondition"
              value={strategyFormData.marketCondition}
              onChange={handleChange}
            >
              <MenuItem value="Bullish">Bullish</MenuItem>
              <MenuItem value="Bearish">Bearish</MenuItem>
              <MenuItem value="Volatile">Volatile</MenuItem>
              <MenuItem value="Sideways">Sideways</MenuItem>
            </Select>
            <Box sx={{ color: "red" }}>{errors.marketCondition}</Box>
          </FormControl>
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <FormControl
            fullWidth
            size="small"
            required
            error={!!errors.riskLevel}
          >
            <InputLabel>Risk Level</InputLabel>
            <Select
              name="riskLevel"
              value={strategyFormData.riskLevel}
              onChange={handleChange}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
            <Box sx={{ color: "red" }}>{errors.riskLevel}</Box>
          </FormControl>
        </Box>

        <Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {strategy && strategy.id !== 0 ? "Update" : "Save"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};
