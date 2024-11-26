import CurrencyPair from "./CurrencyPair";
import User from "./User";

export const configAssociations=()=> {
    User.hasMany(CurrencyPair, {
        foreignKey: "userId",
        as: "currencyPairs",
    });

    CurrencyPair.belongsTo(User, {
        foreignKey: "userId",
        as: "user",
    });
}