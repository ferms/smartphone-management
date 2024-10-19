module.exports = {
    transform: {
      "^.+\\.(ts|tsx)$": "babel-jest",
      "^.+\\.(js|jsx)$": "babel-jest"
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
         "^@/(.*)$": "<rootDir>/src/$1"
      },
    transformIgnorePatterns: [
      "/node_modules/"
    ],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    testEnvironment: "jsdom"
};
