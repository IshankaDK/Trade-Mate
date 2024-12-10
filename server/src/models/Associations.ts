import CurrencyPair from "./CurrencyPair";
import User from "./User";
import Strategy from "./Strategy";

export const configAssociations = () => {

    User.hasMany(CurrencyPair, {
        foreignKey: "userId",
        as: "currencyPairs",
    });

    CurrencyPair.belongsTo(User, {
        foreignKey: "userId",
        as: "user",
    });


    User.hasMany(Strategy, {
        foreignKey: "userId",
        as: "strategies",
    })

    Strategy.belongsTo(User, {
        foreignKey: "userId",
        as: "user",
    });

}