import * as dayjs from "dayjs";
import React, {useEffect, useState} from "react";
import {Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField,} from "@mui/material";
import {LocalizationProvider, MobileDateTimePicker,} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {StrategyDto} from "../../types/StrategyDto.ts";

export interface StrategyFormProp {
    strategy: StrategyDto | null;
}

export const StrategyForm: React.FC<StrategyFormProp> = ({strategy}) => {
    const defaultStrategy: StrategyDto = {
        id: "",
        name: "",
        type: "",
        comment: "",
        description: "",
        marketType: "",
        marketCondition: "",
        riskLevel: "",
        timeFrame: "",
        backtestData: "",
        winRate: 0,
        totalTrades: 0,
        lastModifiedDate: new Date(),
        userId: 0,
        timeFrameStart: null,
        timeFrameEnd: null,
    };

    const [formData, setFormData] = useState<StrategyDto>(strategy || defaultStrategy);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.table(formData)
        console.log(strategy && strategy.id != null ? "Update " + strategy.id : "Save");
    };

    useEffect(() => {
        setFormData(strategy || defaultStrategy);
    }, [strategy]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | {
        name?: string; value: unknown
    }>) => {
        const {name, value} = e.target as HTMLInputElement;
        setFormData((prev) => ({
            ...prev, [name]: value,
        }));
    };


    return (<Box className="max-w-4xl mx-auto p-4" sx={{maxWidth: "600px"}}>
        <form onSubmit={handleSubmit} className="space-y-4">
            <Box sx={{marginBottom: 2}}>
                <TextField
                    label="Name"
                    size="small"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    required
                />
            </Box>

            <Box sx={{marginBottom: 2}}>
                <FormControl fullWidth size="small" required>
                    <InputLabel>Type</InputLabel>
                    <Select
                        name="type"
                        value={formData.type}
                        //@ts-ignore
                        onChange={handleChange}
                        variant="outlined"
                    >
                        <MenuItem value="Scalping">Scalping</MenuItem>
                        <MenuItem value="Swing Trading">Swing Trading</MenuItem>
                        <MenuItem value="Day Trading">Day Trading</MenuItem>
                        <MenuItem value="Position Trading">Position Trading</MenuItem>
                        <MenuItem value="Range Trading">Range Trading</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box sx={{marginBottom: 2}}>
                <TextField
                    label="Comment"
                    size="small"
                    type="text"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                    required
                />
            </Box>

            <Box sx={{marginBottom: 2}}>
                <TextField
                    label="Description"
                    size="small"
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                    required
                />
            </Box>
            <Box sx={{marginBottom: 2}}>
                <FormControl fullWidth size="small" required>
                    <InputLabel>Market Type</InputLabel>
                    <Select
                        name="marketType"
                        value={formData.marketType}
                        //@ts-ignore
                        onChange={handleChange}
                        variant="outlined"
                    >
                        <MenuItem value="Stocks">Stocks</MenuItem>
                        <MenuItem value="Crypto">Crypto</MenuItem>
                        <MenuItem value="Forex">Forex</MenuItem>
                        <MenuItem value="Commodities">Commodities</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box sx={{marginBottom: 2}}>
                <FormControl fullWidth size="small" required>
                    <InputLabel>Market Condition</InputLabel>
                    <Select
                        name="marketCondition"
                        value={formData.marketCondition}
                        variant="outlined"
                        //@ts-ignore
                        onChange={handleChange}
                    >
                        <MenuItem value="Bullish">Bullish</MenuItem>
                        <MenuItem value="Bearish">Bearish</MenuItem>
                        <MenuItem value="Volatile">Volatile</MenuItem>
                        <MenuItem value="Sideways">Sideways</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box sx={{marginBottom: 2}}>
                <FormControl fullWidth size="small" required>
                    <InputLabel>Risk Level</InputLabel>
                    <Select
                        name="riskLevel"
                        value={formData.riskLevel}
                        variant="outlined"
                        //@ts-ignore
                        onChange={handleChange}
                    >
                        <MenuItem value="Low">Low</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="High">High</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box sx={{marginBottom: 2}}>
                <TextField
                    label="Time Frame"
                    size="small"
                    type="text"
                    name="timeFrame"
                    value={formData.timeFrame}
                    onChange={handleChange}
                    fullWidth
                    required
                />
            </Box>

            <Box sx={{marginBottom: 2}}>
                <TextField
                    label="Backtest Data"
                    size="small"
                    type="text"
                    name="backtestData"
                    value={formData.backtestData || ""}
                    onChange={handleChange}
                    fullWidth
                />
            </Box>

            <Box sx={{marginBottom: 2}}>
                <TextField
                    label="Win Rate"
                    size="small"
                    type="number"
                    name="winRate"
                    value={formData.winRate}
                    onChange={handleChange}
                    fullWidth
                    required
                />
            </Box>

            <Grid container spacing={2} sx={{marginBottom: 2}}>
                <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDateTimePicker
                            label="Start Time"
                            value={formData.timeFrameStart ? dayjs(formData.timeFrameStart) : null}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDateTimePicker
                            label="End Time"
                            value={formData.timeFrameEnd ? dayjs(formData.timeFrameEnd) : null}
                        />
                    </LocalizationProvider>
                </Grid>
            </Grid>
            <Box>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    {strategy && strategy.id ? "Update" : "Save"}
                </Button>
            </Box>
        </form>
    </Box>);
};
