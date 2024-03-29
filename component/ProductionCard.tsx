import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Typography } from "@mui/material";
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import React from "react";
import cardStyle from "styles/component/ProductionCard.module.css";


interface CardProps {
    url?: string,
    productionName?: string,
    productionCategory?: string,
    productionIMG?: string,
    productionDescript?: string,
    productionPrice?: number,
    productionPriceMin?: number,
    shopeeUrl?: string,
    urlName?: string,
    alt: string,
    imageWidth?: number,
    imageHeight?: number,
    cardWidth?: number,
}

const ProductionCard: React.FC<CardProps> = (props) => {

    const {
        url,
        productionName,
        productionCategory,
        productionIMG,
        productionDescript,
        productionPrice,
        productionPriceMin,
        shopeeUrl,
        urlName,
        alt,
        imageWidth = 320,
        imageHeight = 320,
        cardWidth = 320
    } = props;

    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    return (
        <Card sx={{ maxWidth: cardWidth }}>
            <ThemeProvider theme={theme}>
                <CardHeader className={cardStyle.cardHeader}
                    component={"a"}
                    href={url ?? ""}
                    title={productionName}          //"商品名稱"
                    subheader={productionCategory}  //"分類"
                />
                <a href={url ?? ""}>
                    <CardMedia
                        component="img"
                        height={imageHeight}
                        width={imageWidth}
                        image={productionIMG} //"圖片路徑"
                        alt={alt}
                    />
                </a>
                <CardContent className={cardStyle.cardContent} >
                    <Grid container item justifyContent="flex-start" alignItems="center">
                        {
                            ((productionPriceMin ?? 0) < (productionPrice ?? 0)) ?
                                <Typography variant="h6" color="text.secondary" marginTop={1} marginBottom={1} marginRight={2}>
                                    <s>${productionPrice}</s>
                                </Typography>
                                : ""
                        }
                        <Typography variant="h5" color="warning.main" marginTop={1} marginBottom={1}>
                            <b>${productionPriceMin}</b> {/*/價格*/} <br />
                        </Typography>
                    </Grid>
                    <Typography variant="body1" color="text.secondary" className={cardStyle.cardContentDescript}>
                        {productionDescript} {/*/敘述*/}
                    </Typography>
                </CardContent>
                <CardActions >
                    <Grid container item justifyContent="flex-end" alignItems="center">
                        <Button color="warning" size="large" variant="contained" href={shopeeUrl} >{urlName}</Button>
                    </Grid>
                </CardActions>
            </ThemeProvider>
        </Card>
    );
}
export default ProductionCard;