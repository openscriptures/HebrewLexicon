<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
				xmlns:oshb="http://openscriptures.github.com/morphhb/namespace"
				xmlns="http://www.w3.org/1999/xhtml">
	<xsl:output method="xml" omit-xml-declaration="yes" indent="yes"/>

	<xsl:template match="/">
		<xsl:apply-templates select="oshb:lexicon/oshb:entry"/>
	</xsl:template>

	<xsl:template match="oshb:entry">
		<div class="entry">
			<p>
				<xsl:value-of select="@id"/>.
				<xsl:apply-templates select="oshb:w[@pos]"/>
				<xsl:apply-templates select="oshb:note"/>
				<xsl:apply-templates select="oshb:source"/>
				<xsl:apply-templates select="oshb:meaning"/>
				<xsl:apply-templates select="oshb:usage"/>
			</p>
		</div>
	</xsl:template>
	
	<xsl:template match="oshb:w[@xlit]">
		<span class="Hebrew"><xsl:value-of select="."/></span>&#8206;
		<span class="xlit"><xsl:value-of select="@xlit"/></span>,
		<span class="pron"><xsl:value-of select="@pron"/></span>
	</xsl:template>
	
	<xsl:template match="oshb:w[@pos]">
		<span class="Hebrew"><xsl:value-of select="."/></span>&#8206;
		<span class="xlit"><xsl:value-of select="@xlit"/></span>,
		<span class="pron"><xsl:value-of select="@pron"/></span>;
		[<xsl:value-of select="@xml:lang"/>; <xsl:value-of select="@pos"/>] 
	</xsl:template>
	
	<xsl:template match="oshb:note">
		<xsl:variable name="typo"><xsl:value-of select="."/></xsl:variable>
		<abbr title="{$typo}">*</abbr>
	</xsl:template>
	
	<xsl:template match="oshb:source">
		<xsl:apply-templates/>&#160;
	</xsl:template>
	
	<xsl:template match="oshb:w[@src]">
		<xsl:variable name="src"><xsl:value-of select="@src"/></xsl:variable>
		<a onclick="wordNav.linkClick('{$src}')" title="{$src}"><xsl:value-of select="."/></a>
	</xsl:template>

	<xsl:template match="oshb:meaning">
		<xsl:apply-templates/>
	</xsl:template>
	
	<xsl:template match="oshb:def">
		<span class="def"><xsl:value-of select="."/></span>
	</xsl:template>
	
	<xsl:template match="oshb:em">
		<em><xsl:value-of select="."/></em>
	</xsl:template>
	
	<xsl:template match="oshb:usage">
		<xsl:text>:—</xsl:text><xsl:apply-templates/>&#160;
	</xsl:template>
	
</xsl:stylesheet>