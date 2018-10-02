#!/bin/bash

JSPATH=`grep -o '\./static/js/main\.[a-z0-9]*\.js' build/index.html`
JSHASH=`echo "$JSPATH" | cut -d\. -f 3`
CSSPATH=`grep -o '\./static/css/main\.[a-z0-9]*\.css' build/index.html`
CSSHASH=`echo "$CSSPATH" | cut -d\. -f 3`

echo "/:path1/main.$JSHASH.js /$JSPATH 301" > build/_redirects
echo "/:path1/:path2/main.$JSHASH.js /$JSPATH 301" >> build/_redirects
echo "/:path1/:path2/:path3/main.$JSHASH.js /$JSPATH 301" >> build/_redirects
echo "/:path1/:path2/:path3/:path4/main.$JSHASH.js /$JSPATH 301" >> build/_redirects
echo "/:path1/:path2/:path3/:path4/:path5/main.$JSHASH.js /$JSPATH 301" >> build/_redirects
echo "/:path1/:path2/:path3/:path4/:path5/:path6/main.$JSHASH.js /$JSPATH 301" >> build/_redirects

echo "/:path1/main.$CSSHASH.css /$CSSPATH 301" >> build/_redirects
echo "/:path1/:path2/main.$CSSHASH.css /$CSSPATH 301" >> build/_redirects
echo "/:path1/:path2/:path3/main.$CSSHASH.css /$CSSPATH 301" >> build/_redirects
echo "/:path1/:path2/:path3/:path4/main.$CSSHASH.css /$CSSPATH 301" >> build/_redirects
echo "/:path1/:path2/:path3/:path4/:path5/main.$CSSHASH.css /$CSSPATH 301" >> build/_redirects
echo "/:path1/:path2/:path3/:path4/:path5/:path6/main.$CSSHASH.css /$CSSPATH 301" >> build/_redirects

cat "public/_redirects" >> build/_redirects
