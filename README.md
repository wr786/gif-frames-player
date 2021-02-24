# GIF Frames Player

> A web player that shows the frames of a given GIF.

React + AntD

## TODO

- [ ] GIF upload and auto split
- [ ] package with `Electron`

## Usage

1. `yarn install`

2. Put your image serial @ `./public/assets/images/`

3. Edit `./src/index.js`

   ```javascript
   class MainPage extends React.Component {
     constructor(props) {
       super(props);
       this.state = {
         /* Edit Here */
         /*
         	In this example, the images are renamed as
         	"XVmZGe0-1.png" to "XVmZGe0-131.png"
         */
         folderRelPath: "/assets/images/",
         imagePrefix: "XVmZGe0",				// Change this to your prefix
         imageSuffix: ".png", 					// Change this to your suffix
         imageTotNum: 131, 					// Change this to total num of images
         imageCurIdx: 1,
         splitChar: '-', 						// Change this to your split char
         isPlaying: false,
       };
       setInterval(this.update_play, 100);
     }
   //...
   ```

4. `yarn start`

